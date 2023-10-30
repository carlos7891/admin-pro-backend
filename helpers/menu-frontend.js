const getMenu = (role) => {
    const menu = [
        {
          title:'Dashboard',
          icon:'mdi mdi-gauge',
          submenu:[
            {title:'Main', url:'/'},
            {title:'ProgressBar', url:'progress'},
            {title:'Graficas', url:'graph1'},
            {title:'Promesas', url:'promise'},
            {title:'Rxjs', url:'rxjs'},
          ]
        },
        {
          title:'Maintenance',
          icon:'mdi mdi-folder-lock-open',
          submenu:[
            {title:'Hospitals', url:'hospitals'},
            {title:'Doctors', url:'doctors'}
          ]
        }
      ]
    if (role === 'ADMIN_ROLE'){
        menu[1].submenu.unshift({title:'Users', url:'users'})
    }

    return menu;
}

module.exports = {
    getMenu
}