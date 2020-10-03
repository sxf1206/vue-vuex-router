//1.插件
//2.俩个组件
let Vue;
class  VueRouter {
 constructor(options) {
   this.$options = options;
   //current作为响应式数据
   const initial = window.location.hash.slice(1) || "/";
   Vue.util.defineReactive(this, 'current', initial)
    //监听hash的变化
     window.addEventListener("hashchange",()=>{
       console.log(this.current)
       this.current=window.location.hash.slice(1)
     })
  }
}
//参数是vue.use调用时传入的
VueRouter.install = function(_Vue) {
   Vue=_Vue;
   Vue.mixin({
     beforeCreate(){      
        if (this.$options.router) {
          Vue.prototype.$router = this.$options.router;
        }
     }
   })
   //注册实现两个组件 router-link  reouter-view
   Vue.component("router-link", {
     props:{
       to:{
          type: String,
          required:true,
       },
     },
     render(h){
       return h(
         "a", 
         {
           attrs: {
             href: "#" + this.to,
           },
         }, this.$slots.default 
        );
     },

   });
   Vue.component("router-view", {
        render(h){
          ///获取当前路由组件
          let component=null
          const route = this.$router.$options.routes.find(
            (route) => route.path === this.$router.current
          )
          if (route) {
            component = route.component
          }
          console.log(this.$router.current,component)
          return h(component)
        },
   })
}
export default VueRouter;