export default {
  addCounter: function(state, payload) {
    payload.count++;
  },
  addToCart: function(state, payload) {
    payload.checked = false;
    payload.count = 1;
    state.cartList.push(payload);
  }
}
