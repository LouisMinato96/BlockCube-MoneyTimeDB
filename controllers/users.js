const UserModal = require('./../models/users');
const PackModal = require('./../models/packTable');

const UpdatePackForChildUser = async (UserNamePackIdObj, child) => {

    const packContainingChildren = UserNamePackIdObj.filter(
        (e, i) => {
            return e.userName === child.userName;
        }
    )[0];

    const sponsorIds = packContainingChildren.pack.sponsorId.map(
        (userName, i) => {
            if (userName === child.userName) {
                return null;
            }
            return userName;
        }
    );

    PackModal.updateOne(
        { packId: packContainingChildren.packId },
        { sponsorId: sponsorIds },
        function (err, docs) {
            console.log('PackModal updated for Child');
        }
    );

}

const InsertAndUpdateForUser = async (User, UserAncestors, packCode) => {

    // Insert
    const AncestorForThisPackCode = null;
    for (const ancestor of UserAncestors) {
        if (ancestor.packCode >= packCode) {
            AncestorForThisPackCode = ancestor;

            // Check if last pack has space left
            const lastPackIdForThisPackCode = ancestor[packCode][ancestor[packCode].length - 1];
            const packObj = await PackModal.findOne({ packId: lastPackIdForThisPackCode });
            if (packObj.sponsorId.length < 4) {
                packObj.sponsorId.push(User.userName);
                PackModal.updateOne(
                    { packId: lastPackIdForThisPackCode },
                    { sponsorId: packObj.sponsorId },
                    function (err, docs) {
                        console.log('PackModal updated');
                    }
                )
            }
            break;
        }
    }

    const sponsorIdsForAncestor = AncestorForThisPackCode.sponsorId[packCode];
    const ArrayOfPack = await PackModal.find({
        packId: { $in: sponsorIdsForAncestor }
    });

    const UserNamePackIdObj = [];
    for (const pack of ArrayOfPack) {
        for (const userName of pack.sponsorId) {

            UserNamePackIdObj.push({
                userName,
                packId: pack.packId,
                pack
            });

        }
    }

    // Update
    const ChildrenNeedToUpdate = [];
    const UserChildren = await UserModal
        .find({
            'sponsorId': User['userName']
        });
    ChildrenNeedToUpdate.push(UserChildren);

    let index = 0;
    while (index < ChildrenNeedToUpdate.length) {

        const childUser = ChildrenNeedToUpdate[index];

        if (childUser.packCode >= packCode) {
            UpdatePackForChildUser(UserNamePackIdObj, childUser);
        } else {
            const ThisUserChildren = await UserModal
                .find({
                    'sponsorId': childUser['userName']
                });
            ChildrenNeedToUpdate.push( ThisUserChildren );    
        }

        index++;

    }

}

module.exports = {
    buypack: async (req, res, next) => {
        console.log(`value.body ${JSON.stringify(req.value.body)}`);
        console.log(`UserController.buypack() called!`);
        const { userName, packCode, price } = req.value.body;

        // Get User Details
        const User = await UserModal.findOne({ userName });
        const ancestorsponsorIds = User.ancestorSponsorIds;

        // Find All the Ancestors
        const UserAncestors = await UserModal
            .find({
                'userName': { $in: ancestorsponsorIds }
            });

        // Insert and Update for Packcode
        const oldPackCode = User.packCode;
        for (let i = oldPackCode + 1; i <= packCode; i++) {
            await InsertAndUpdateForUser(User, UserAncestors, i);
        }


        res.status(200).json({ token: jwtToken });
    }
};