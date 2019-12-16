import React from "react";
import { Actions } from "../../store/index";

const Comp = props => {
    const handleClick = async () => {
        // console.log(Actions["home/fetchGoodsNav"],'Actions["home/fetchGoodsNav"]')
        Actions["home/fetchGoodsNav"]();
    };
    return (
        <div onClick={handleClick}>
            <p>-----home--dva-----</p>
        </div>
    );
};

export default Comp;
