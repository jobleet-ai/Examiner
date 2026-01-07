export const handleRouting = async(item, navigate)=>{
                     
    console.log("handleRouting", item)

    let routingPath = '/mainview';

    if (item.category ==='md') {
      if(item.path.indexOf('test')>=0) {
        routingPath += 'test/'
      } else if(item.path.indexOf('learn')>=0) {
        let file = `/learn/${item.group}/${item.title}`.toLowerCase().replaceAll(' ', '_');
        routingPath = `${file}`
      } else if(item.path.indexOf('design')>=0) {
        let file = item.source.replaceAll('_', '-').replace('.md','');
        routingPath = `/${file}`
      } else if(item.path.indexOf('ivwprep')>=0) {
        let file = `/interview/${item.group}/${item.title}`.toLowerCase().replaceAll(' ', '_');
        routingPath = `${file}`
      } else if(item.path.indexOf('courses')>=0) {
        let file = `/courses/${item.group}/${item.key}`;
        routingPath = `${file}`
      }
      
      console.log("routingPath123", routingPath);
      //navigate.replace(routingPath);
      navigate(routingPath, { replace: true });
      
  } else if(item.category ==='pdf'){
    let sub = 'topic';
    if(item.path.indexOf('learn') >=0 ) {
      sub = 'learn';
    } else if(item.path.indexOf('ivwprep') >= 0) {
      sub = 'interview';
    } else if(item.path.indexOf('courses') >= 0) {
      sub = 'courses';
    }
    let file = `/_${sub}/${item.group}/${item.title}`.toLowerCase().replaceAll(' ', '_');
    //let file = `/${sub}/${item.group}/${item.title}`.toLowerCase().replaceAll(' ', '_');
    routingPath = `${file}`
    console.log("routingPath", routingPath);
    navigate(routingPath);

  } else {
    routingPath = `/${item.toLowerCase()}`
    console.log("routingPath", routingPath);
    navigate(routingPath);
  }
}

export const handleDesignRouting = async(item, navigate)=>{

    let routingPath = `/design/${item.group}/${item.key}.md`
    console.log("handleDesignRouting::", routingPath);
    navigate(routingPath);
  
}