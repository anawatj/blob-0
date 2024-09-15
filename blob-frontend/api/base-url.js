 const baseUrl= (typeof window === 'undefined')?'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local':'/';
 export default baseUrl;