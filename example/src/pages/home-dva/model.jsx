import { fetchAddress } from "../../utils/server";

const model = {
    namespace: "home",
    state: {
        boo: true,
    },
    effects: {
        fetchGoodsNav: async payload => {
            const data = await fetchAddress();
            console.log(data, payload, "test-in-model");
        },
    },
    reducers: {
        save(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
    },
};

export default model;
