export const adminNavigation = [
  {id:'catalog',label:'Catalog',icon:'inventory_2',links:[{href:'/admin/products',label:'Products'},{href:'/admin/categories',label:'Categories'},{href:'/admin/inventory',label:'Inventory'}]},
  {id:'sales',label:'Sales',icon:'payments',links:[{href:'/admin/orders',label:'Orders'},{href:'/admin/transactions',label:'Transactions'}]},
  {id:'people',label:'People',icon:'group',links:[{href:'/admin/users',label:'Users'},{href:'/admin/distributors',label:'Distributors'}]},
  {id:'insights',label:'Insights',icon:'analytics',links:[{href:'/admin/reports',label:'Reports'},{href:'/admin/analytics',label:'Analytics'}]},
  {id:'settings',label:'Settings',icon:'warehouse',links:[{href:'/admin/shipping-settings',label:'Shipping settings'}]},
];
export function isAdminLinkActive(pathname:string,href:string){return pathname===href||pathname.startsWith(href+'/');}
export function activeAdminGroup(pathname:string){return adminNavigation.find(group=>group.links.some(link=>isAdminLinkActive(pathname,link.href)))?.id??null;}
