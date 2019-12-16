const model = {
    namespace: "address",
    state: {
        boo: true,
    },
    effects: {
        fetchGoodsNav: async payload => {
            // const result = await getV1UsersAddresses();
            console.log( payload, "test-in-model");
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