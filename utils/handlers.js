
import axios from "axios";

export const addToCart = async (product) => {
    

    const { data } = await axios.get(`/api/products/${product._id}`);
    if(data.countInStock < 1 ){
      window.alert("Sorry this item is out of stock");
      return {status: ""};
    }
    return {
        status: "ok",
        dispatch: {type: 'CART_ADD_ITEM', payload: {...product, quantity: 1}},
        location: "/cart"
    };
}

