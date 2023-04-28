<script>
  import Router from 'svelte-spa-router';
  import {wrap} from 'svelte-spa-router/wrap';
  let routes = {
    '/': wrap({
      asyncComponent: () => import('./views/Home.svelte'),
    }),
    '/login': wrap({
      asyncComponent: () => import('./views/Login.svelte'),
    }),
    '/signup': wrap({
      asyncComponent: () => import('./views/Signup.svelte'),
    }),
    '/test': wrap({
      asyncComponent: () => import('./views/Test.svelte'),
    }),
    '/search': wrap({
      asyncComponent: () => import('./views/Search.svelte'),
    }),
    '/post': wrap({
      asyncComponent: () => import('./views/CreatePost.svelte'),
      conditions: () => {
          return (localStorage.getItem('logged') == "true") ? true : false;
      }
    }),
    '*' : wrap({
      asyncComponent: () => import('./views/404.svelte'),
    })  
  };
</script>

<Router {routes} />


