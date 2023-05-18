<script>
  import Router from 'svelte-spa-router';
  import {wrap} from 'svelte-spa-router/wrap';
  import {replace} from 'svelte-spa-router'
  import PageWithNav from './layouts/PageWithNav.svelte';

  let fullscreen = false;

  let continueTo = "/";

  $: routes = {
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
      conditions: (detail) => {
          return (localStorage.getItem('logged') == "true") ? true : false;
      },
      props: {
        continueRoute: "/account"
      }
    }),
    '/article': wrap({
      asyncComponent: () => import('./views/Article.svelte'),
    }),
    '/post': wrap({
      asyncComponent: () => import('./views/CreatePost.svelte'),
      conditions: (detail) => {
          return (localStorage.getItem('logged') == "true") ? true : false;
      },
      props: {
        continueRoute: "/post"
      }
    }),
    '/login': wrap({
      asyncComponent: () => import('./views/Login.svelte'),
      props: {
        continueRoute: continueTo
      }
    }),
    '/signup': wrap({
      asyncComponent: () => import('./views/Signup.svelte'),
    }), 
    '*' : wrap({
      asyncComponent: () => import('./views/404.svelte'),
    })
  };
  let fullscreenRoutes = ["/login", "/signup"]

  function routeChanged(e) {
    // console.log(e);
    // console.log(e.detail.location);
    if (fullscreenRoutes.includes(e.detail.location)) {
      fullscreen = true;
      console.log("fullscreen true");
    } else {
      fullscreen = false;
      console.log("fullscreen false");
    }
  }

  function conditionsFailed(event) {
    console.log('conditionsFailed event', event.detail);
    continueTo = `/#${event.detail.location}`;
    console.log(continueTo);
    replace('/login');
  }
</script>

{#if fullscreen}
<Router routes={routes} on:conditionsFailed={conditionsFailed} on:routeLoaded={routeChanged}/>
{:else}
<PageWithNav routes={routes} routerComponent={Router} on:conditionsFailed={conditionsFailed} on:routeLoaded={routeChanged} />
{/if}


