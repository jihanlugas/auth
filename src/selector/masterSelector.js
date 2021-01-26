import {createSelector} from 'reselect';
import {List, Map} from 'immutable';
import { v4 as uuidv4 } from 'uuid';

export const mergeMeasurement = createSelector(
    (measureUnit) => {
        if (measureUnit.size > 0) {
            const {weightUnits, volumeUnits} = measureUnit;

            return weightUnits.merge(volumeUnits).toList();
        } else {
            return List();
        }
    },
    allMeasurement => allMeasurement
);

export const initFormikUserManage = createSelector(
    (users, selectedUser) => {
        let initValue = {
            userId: 0,
            userGuid: "",
            pin: "",
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            role: "",
            isActive: true,
            mobile: "",
            dob: new Date(),
            gender: "",
            password: "",
        };

        if (selectedUser != null) {
            const userData = users.get(selectedUser);

            if (userData !== undefined) {
                initValue.userId = userData.get("userId");
                initValue.pin = userData.get("pin");
                initValue.userGuid = userData.get("userGuid");
                initValue.firstName = userData.get("firstName");
                initValue.lastName = userData.get("lastName");
                initValue.email = userData.get("email");
                initValue.isActive = userData.get("isActive");
                initValue.username = userData.get("username");
                initValue.role = userData.get("role");
                initValue.gender = userData.get("gender");
                initValue.mobile = userData.get("mobile");
                initValue.dob = new Date(userData.get("dob"));
            }
        }

        return initValue;
    },
    user => user
);

export const initFormikTaxProfile = createSelector(
    (taxs, selectedTax) => {
        let initValue = {
            profileId: 0,
            profileName: "",
            tax: List(),
        };

        if (selectedTax != null) {
            const taxData = taxs.get(selectedTax);

            if (taxData !== undefined) {
                initValue.profileId = taxData.get("profileId");
                initValue.profileName = taxData.get("profileName");
                initValue.tax = taxData.get("tax").toList().sortBy((a) => a.get("order"));
            }
        }

        return initValue;
    },
    tax => tax
);

export const initFormikPosMenu = createSelector(
    (posMenus, selectedTax) => {
        let initValue = {
            posMenuSectionId: 0,
            name: "",
        };

        if(selectedTax != null) {
            const posMenuData = posMenus.get(selectedTax);

            if(posMenuData !== undefined) {
                initValue.posMenuSectionId = posMenuData.get("posMenuSectionId");
                initValue.name = posMenuData.get("name");
            }
        }

        return initValue;
    },
    value => value
);
export const initFormikAppSetting = createSelector(
    (selectedAppSetting) => {

        let initValue = {
            appSettingId : "",
            title:"",
            description:"",
            isActive: false,
        };

        if(selectedAppSetting != null) {
            initValue = {
                ...initValue,
                ...selectedAppSetting.toJS()
            }
        }

        return initValue;
    },
    value => value
);
export const initFormikReason = createSelector(
    (selectedReason) => {

        let initValue = {
            reasonId : "",
            type:"",
            reason:"",
            staff:"",
            created_dt:"",
            isActive: false,
        };

        if(selectedReason != null) {
            initValue = {
                ...initValue,
                ...selectedReason.toJS()
            }
        }

        return initValue;
    },
    value => value
);
export const initFormikPrintGroup = createSelector(
    (selectedValue) => {

        let initValue = {
            printGroupId : "",
            groupName:"",
        };

        if(selectedValue != null) {
            initValue = {
                ...initValue,
                ...selectedValue.toJS()
            }
        }

        return initValue;
    },
    value => value
);

export const initFormikTax = createSelector(
    (taxData) => {
        let initValue = {
            taxId: uuidv4(),
            taxName: "",
            amountPerc: "",
            isStack: false,
            order: 0
        };

        if (taxData != null) {
            if (taxData !== undefined) {
                initValue.taxId = taxData.get("taxId");
                initValue.taxName = taxData.get("taxName");
                initValue.amountPerc = taxData.get("amountPerc");
                initValue.isStack = taxData.get("isStack");
                initValue.order = taxData.get("order");
            }
        }

        return initValue;
    },
    tax => tax
);

export const initFormikSalesCoupon = createSelector(
    (coupons, selectedCoupon) => {
        let initValue = {
            couponId: uuidv4(),
            couponName: "",
            couponCode: "",
            couponType: "",
            maxUsage: 0,
            minSpend: 0,
            discType: 1,
            discAmt: 0,
            listItems: [],
            listRole: [],
            listCategory: [],
            expiredDate: "",
            isActive: false,
        };

        if (selectedCoupon != null) {
            const data = coupons.get(selectedCoupon);

            if (data !== undefined) {
                initValue.couponId = data.get("couponId");
                initValue.couponName = data.get("couponName");
                initValue.couponCode = data.get("couponCode");
                initValue.couponType = data.get("couponType");
                initValue.maxUsage = data.get("maxUsage");
                initValue.minSpend = data.get("minSpend");
                initValue.discType = data.get("discType");
                initValue.discAmt = data.get("discAmt");
                initValue.listItems = ["vdfobfw", "alksdj"];
                initValue.listItems = data.get("listItems").map(v => v.get("productId")).toJS();
                initValue.listRole = data.get("listRole").map(v => v.get("roleId")).toJS();
                initValue.listCategory = data.get("listCategory").map(v => v.get("categoryId")).toJS();
                initValue.isActive = data.get("isActive");
                initValue.expiredDate = data.get("expiredDate") === null ? new Date(data.get("expiredDate")) : "";
            }
        }

        return initValue;
    },
    user => user
);

export const toArrayObject = createSelector(
    (map, keyArray) => {
        return map.reduce((result, mapVal) => {
            let obj = {};

            keyArray.forEach(el => {
                obj[el] = mapVal.get(el);
            });

            result.push(obj);
            return result;
        }, [])
    },
    arrayObject => arrayObject
);


export const orderArray = createSelector(
    (map, keyArray) => {
        return map.reduce((result, mapVal) => {
            let obj = {};

            keyArray.forEach(el => {
                obj[el] = mapVal.get(el);
            });

            result.push(obj);
            return result;
        }, [])
    },
    arrayObject => arrayObject
);


export const initFormikSalesCreditAccount = createSelector(
    (creditaccount, selectedCreditAccount) => {
        let initValue = {
            creditAccountId: "",
            name: "",
            password: "",
            customer: "",
            belance: 0,
            isActive: false,
            maxCredit: "",
            maxAmmountPerTransaction: "",
            notes: "",
        };

        if (selectedCreditAccount != null) {
            const data = creditaccount.get(selectedCreditAccount);

            if (data !== undefined) {
                initValue.creditAccountId = data.get("creditAccountId");
                initValue.name = data.get("name");
                initValue.customer = data.get("customer").toJS();
                initValue.belance = data.get("belance");
                initValue.isActive = data.get("isActive");
                initValue.maxCredit = data.get("maxCredit");
                initValue.maxAmmountPerTransaction = data.get("maxAmmountPerTransaction");
                initValue.notes = data.get("notes");

            }
        }

        return initValue;
    },
    user => user
)


export const initFormikSalesPromotion = createSelector(
    (promotions, selectedPromotion) => {
        let initValue = {
            promotionId: "",
            timePeroidFrom: "",
            timePeroidTo: "",
            // Step 1
            promotionName: "",
            orderType: [],
            isActive: false,
            // Step 2
            purchaseRequirement: [
                {
                    requirementType: "CATEGORY",
                    qty: "",
                    category: [],
                    product: [],
                    variant: [],
                    productTag: []
                }
            ],
            // Step 3
            purchaseReward: [
                {
                    rewardType: "PRODUCT",
                    qty: "",
                    product: "",
                    variant: "",
                    discType: "1",
                    discAmount: "",
                    allRequirement: false,
                    fromRequirement: "CATEGORY",
                    withLimitQty: false,
                    limitQty: "",
                    startForm: "CHEAPEST",
                }
            ],
            // Step 4
            applyMultiple: false,
            startDate: "",
            endDate: "",
            period: [
                // {
                //     daysOfWeek: [],
                //     startTime: "",
                //     endTime: ""
                // }
            ],
        };

        if (selectedPromotion != null) {
            const data = promotions.get(selectedPromotion);

            if (data !== undefined) {
                initValue.promotionId = data.get("promotionId");
                initValue.timePeroidFrom = data.get("timePeroidFrom");
                initValue.timePeroidTo = data.get("timePeroidTo");
                initValue.promotionName = data.get("promotionName");
                initValue.orderType = data.get("orderType").toJS();
                initValue.isActive = data.get("isActive");
                initValue.purchaseRequirement = data.get("purchaseRequirement");
                initValue.category = data.get("category").toJS();
                initValue.product = data.get("product").toJS();
                initValue.variant = data.get("variant").toJS();
                initValue.productTag = data.get("productTag").toJS();
            }

        }

        return initValue;
    },
    user => user
)
export const initFormikPosMenuSide = createSelector(
    (ItemData) => {
        return {
            productId: 0,
            productCode:"",
            productPrice:"",
            taxable:false,
            nodeType: '',
            nodeId: 0,
            nodeParentId: 0,
            menuSide : "", // item / section
            type : "product", // product / group
            label: "",
            bgColor: "#ffffff00",
            textColor: "#000000",
            bgImage: "",
            ...ItemData
        };
    },
    value => value
);

export const filterVariant = createSelector(
    (allVariant, productId) => {
        const variants = allVariant.filter((variant) => {
            return variant.get("productId") == productId;
        });

        return variants;
    },
    variants => variants
);