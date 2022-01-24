import { ToastOptions } from "react-toastify";
import { Action } from "redux";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "lottie-player": any;
    }
  }
}

export interface Product {
  imageURL: string;
  name: string;
  price: number;
  category: string;
  description: string;
  id: string;
}

export interface Category {
  name: string;
  id: string;
}

export interface reduxState {
  cartItem: Product[];
}

export interface Item extends Action {
  item: Product;
}

export interface LayoutProps {
  children: any;
  isLoading: boolean;
  className: string;
}

export interface RegisterData {
  email: string;
  password: string;
}

export const options: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export interface User {
  email: string;
  uid: string;
}

export interface AddressInfo {
  pincode: string;
  name: string;
  address: string;
  phone: string;
}

export interface Order {
  addressInfo: AddressInfo;
  cartItems: Product[];
  email: string;
  id: string;
  userId: string;
}

export interface ListProps {
  // Items: Product[];
  cartItems: Product[];
  isCart: boolean;
}

export const initialProduct = {
  category: "",
  imageURL: "",
  price: 0,
  name: "",
  id: "",
  description: "",
};

/*
export const fireProducts: product[] = [
    {
        category: "fashion",
        description: "",
        imageURL: "https://m.media-amazon.com/images/I/31JGZ75kF6S._AC_UL320_.jpg",
        name: "Casual jacket for women",
        price: 800
    },
    {
        category: "fashion",
        description: "",
        imageURL: "https://m.media-amazon.com/images/I/31fWkOIti5L._AC_UL320_.jpg",
        name: "Quilted Zipped Jacket For Men",
        price: 400
    },
    {
        category: "fashion",
        description: "",
        imageURL: "https://m.media-amazon.com/images/I/71lx4yhqGvL._AC_UL320_.jpg",
        name: "Sweatshirt melton Zipper with Fur inside",
        price: 1200
    },
    {
        category: "electronics",
        description: "",
        imageURL: "https://images-eu.ssl-images-amazon.com/images/I/41dXTgBc9tL._AC_SX184_.jpg",
        name: "Shure MOTIV Mic - MV5-B-LTG",
        price: 2500
    },
    {
        category: "electronics",
        description: "",
        imageURL: "https://images-eu.ssl-images-amazon.com/images/I/31otr1TlRWL._AC_SX184_.jpg",
        name: "Shure Pga58-Xlr Cardioid Dynamic Vocal",
        price: 1500
    },
    {
        category: "electronics",
        description: "",
        imageURL: "https://images-eu.ssl-images-amazon.com/images/I/31PcQNKgPdS._AC_SX184_.jpg",
        name: "JBL Live 200BT Neckband Wireless Earphones - GreenJBL Live 200BT Neckband Wireless",
        price: 1400
    },
    {
        category: "electronics",
        description: "",
        imageURL: "https://images-eu.ssl-images-amazon.com/images/I/312xNTnlw9L._AC_SX184_.jpg",
        name: "JBL T215TWS In-Ear Bluetooth Earbuds - PurpleJBL T215TWS In-Ear Bluetooth Earbuds",
        price: 20000
    },
    {
        category: "mobiles",
        description: "",
        imageURL: "https://m.media-amazon.com/images/I/61qcH1P2XjS._AC_UL320_.jpg",
        name: "Samsung Galaxy S21 Ultra Dual SIM Mobile - 6.8 Inches, 256 GB, 12 GB RAM, 5G - Black",
        price: 22000
    },
    {
        category: "mobiles",
        description: "",
        imageURL: "https://m.media-amazon.com/images/I/61i8Vjb17SL._AC_UL320_.jpg",
        name: "iPhone 13 Pro Max 256GB Sierra Blue",
        price: 25000
    },
    {
        category: "mobiles",
        description: "",
        imageURL: "https://m.media-amazon.com/images/I/51FQnI1QzDL._AC_UL320_.jpg",
        name: "Samsung Galaxy A52s Dual SIM - 128GB, 8GB RAM, 5G, Awesome Mint",
        price: 7000
    }
]
*/
