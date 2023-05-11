<script>
  import Router from 'svelte-spa-router';
  import {wrap} from 'svelte-spa-router/wrap';
  import PageWithNav from './layouts/PageWithNav.svelte';

  let fullscreen = false;

  let layoutRoutes = {
    '/': wrap({
      asyncComponent: () => import('./views/Home.svelte'),
    }),
    '/privacy': wrap({
      asyncComponent: () => import('./views/Privacy.svelte'),
    }),
    '/terms': wrap({
      asyncComponent: () => import('./views/TOS.svelte'),
    }),
    '/test': wrap({
      asyncComponent: () => import('./views/Test.svelte'),
    }),
    '/search': wrap({
      asyncComponent: () => import('./views/Search.svelte'),
    }),
    '/account': wrap({
      asyncComponent: () => import('./views/Account.svelte'),
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
  let fullscreenRoutes = {
    '/login': wrap({
      asyncComponent: () => import('./views/Login.svelte'),
    }),
    '/signup': wrap({
      asyncComponent: () => import('./views/Signup.svelte'),
    }),
    
  }

  function routeChanged(e) {
    console.log(e);
    console.log(e.detail.location);
    if (e.detail.location in fullscreenRoutes) {
      fullscreen = true;
      console.log("fullscreen true");
    } else {
      fullscreen = false;
    }
  }
</script>

{#if fullscreen}
<Router routes={fullscreenRoutes} />
{:else}
<PageWithNav routes={layoutRoutes} routerComponent={Router} on:routeLoaded={routeChanged}/>
{/if}


