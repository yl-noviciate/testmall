export default {
  cartLength: function(state) {
    return state.cartList.length;
  },
  cartList: function(state) {
    return state.cartList;
  },
  cartCount: function(state) {
    return state.cartList.filter(item => {
      return item.checked
    }).reduce((preValue, item) => {
      return preValue + item.count
    }, 0)
  }
}
