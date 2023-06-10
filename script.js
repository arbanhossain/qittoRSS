
window.onload = () => {
  URLS.forEach(tag => {
    //fetch the url and parse the xml as html
    fetch(tag.url).then(response => response.text()).then(str => new window.DOMParser().parseFromString(str, "text/xml")).then(data => {
      console.log(data)
      let posts;
      let entries = data.querySelectorAll("entry");
      let items = data.querySelectorAll("item");
      if(entries.length > 0) {
        posts = entries;
      } else if (items.length > 0) {
        posts = items;
      }
      //create a document fragment to hold the posts
      //create a heading for the feed
      let frag = document.createDocumentFragment();
      let heading = document.createElement("h1");
      heading.textContent = tag.name;
      frag.appendChild(heading); 
      //loop through the posts
      posts.forEach(post => {
        let title = post.querySelector("title").textContent;
        let link = "";
        if(post.querySelector("link").textContent == "") {
          link = post.querySelector("link").attributes.href.textContent;
        } else {
          link = post.querySelector("link").textContent;
        }
        if(link == "") {
          link = "#";
        }
        
        // create a series of divs with title and link
        let div = document.createElement("div");
        let h2 = document.createElement("h3");
        let a = document.createElement("a");
        h2.textContent = title;
        a.textContent = link;
        a.href = link;
        div.appendChild(h2);
        div.appendChild(a);
        frag.appendChild(div);
      })
      document.querySelector('output').appendChild(frag);
    })
  })
  //append the fragment to the body
}