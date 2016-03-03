// {"options": ["Все", "Сайдинг", "Фасадные панели", "Дренажные системы", "Газонная решеткa", "Водосточные системы", "Внутренняя отделка"]}


gallery: {

  options: ["Все", "Сайдинг", "Фасадные панели", "Дренажные системы", "Газонная решеткa", "Водосточные системы", "Внутренняя отделка"]

    // defaults: {
    //     title: 'Главная',
    //     useSocialMetaTags: true
    // },
    // gallery: {
    //     title: 'Галерея',
    //     useSocialMetaTags: true
    // }
}
,

head: {
    defaults: {
        title: 'Главная',
        useSocialMetaTags: true
    },
    gallery: {
        title: 'Галерея',
        useSocialMetaTags: true
    },
    lawngrids: {
        title: 'Газоннные решетки',
        useSocialMetaTags: true
    },
    cart: {
        title: 'Карточка товара',
        useSocialMetaTags: true
    }
}
,

__pages: [{
                name: 'cart',
                href: '/cart.html'
             },{
                name: 'gallery',
                href: '/gallery.html'
             },{
                name: 'index',
                href: '/index.html'
             },{
                name: 'lawngrids',
                href: '/lawngrids.html'
             }]