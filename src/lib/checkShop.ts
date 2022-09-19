const shopData = require("./shopData.json");

interface ShopData {
    shopId: number,
    shopName: string
}

const checkShop = (shopId:number): ShopData[] => {
    return shopData.filter((shop) => {
        if (shop.shopId == shopId) {
            return shop;
        }
    })
}

export default checkShop;