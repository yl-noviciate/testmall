export default {
  addCart: function(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
      if (oldProduct) {
        context.commit('addCounter', oldProduct);
        resolve('数量+1')
      } else {
        context.commit('addToCart', payload);
        resolve('添加购物车成功')
      }
    })
  }
}
