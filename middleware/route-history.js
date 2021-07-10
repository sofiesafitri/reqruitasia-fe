export default function({ route, store }) {
    store.dispatch("route-history/setRouteHistories", route.path);
}
