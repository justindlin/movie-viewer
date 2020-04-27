import axios from 'axios';

//key: 5b3048d588bba734997a5b70a2f8cd3e

//img: https://image.tmdb.org/t/p/original/{imgpath}

function parseList(movies){
    var list = movies.split(",");
    return list;
}

export default {

    //generates a list of movies in a grabbable scrolling list based on a search 
    find(name, callback){
        name = name.replace(/\s/g, '+');
        let url = 'https://api.themoviedb.org/3/search/movie?api_key=5b3048d588bba734997a5b70a2f8cd3e&query='+name;

        axios.get(url).then((result)=>{
            callback(result);

            document.getElementById("scroller").classList.remove("hide");
            
            let container = document.getElementById("scroller");
            container.innerHTML = "";
            var i;

            //displays at most 10 results of movies
            for(i = 0; i < 10; i++){
                if(i>result.data.results.length){
                    break;
                }
                let item = document.createElement("div");
                item.classList.add("item");
                item.classList.add("item1");
                

                let img = document.createElement("img");

                var url;

                //tries to display movie poster. if database has no movie poster, display generic image
                if(result.data.results[i].poster_path==null){
                    url = "/img/reel.e6caa21c.png";
                    img.setAttribute("srcset",url);
                }else{
                    url = "https://image.tmdb.org/t/p/original"+result.data.results[i].poster_path;
                    img.setAttribute("srcset", url);
                }
                

                //creates a link to new page for viewing movie information
                let title = document.createElement("a");
                title.setAttribute("href","/search/movie?movieID="+result.data.results[i].id);
                title.classList.add("router-link-active");
                title.classList.add("title");
                title.appendChild(document.createTextNode(result.data.results[i].title));

                //weird effect happening on scoped style. Looks like it needs this attribute code to be added for it to be affected by styling :thinking:
                //data-v-0eca37cb=""
                title.setAttribute("data-v-0eca37cb", "");
                img.setAttribute("data-v-0eca37cb", "");
                item.setAttribute("data-v-0eca37cb", "");

                img.setAttribute("onmousedown", "return false");

                img.classList.add("tiny");
                item.appendChild(img);
                item.appendChild(title);
                container.appendChild(item);
            }
        }).catch((error) => {
            console.log(error);
        });
    },

    //shows a scrollable list in the profile page
    showFav(movies){
        let container = document.getElementById("scroller");
        let list = parseList(movies);

        
        container.classList.remove("hide");
        
        //adding an item per favorited movie
        for(var i = 0 ; i < list.length; i ++){
            let url = "https://api.themoviedb.org/3/movie/" + list[i] + "?api_key=5b3048d588bba734997a5b70a2f8cd3e";
            axios.get(url).then((result)=>{

                let item = document.createElement("div");
                item.classList.add("item");
                item.classList.add("item1");
                

                let img = document.createElement("img");

                var url;

                //tries to display movie poster. if database has no movie poster, display generic image
                if(result.data.poster_path==null){
                    url = "/img/reel.e6caa21c.png";
                    img.setAttribute("srcset",url);
                }else{
                    url = "https://image.tmdb.org/t/p/original"+result.data.poster_path;
                    img.setAttribute("srcset", url);
                }
                
                
                //creates a link to new page for viewing movie information
                let title = document.createElement("a");
                title.setAttribute("href","/search/movie?movieID="+result.data.id);
                title.classList.add("router-link-active");
                title.classList.add("title");
                title.appendChild(document.createTextNode(result.data.title));

                //weird effect happening on scoped style. Looks like it needs this attribute code to be added for it to be affected by styling :thinking:
                //data-v-0eca37cb=""
                title.setAttribute("data-v-0eca37cb", "");
                img.setAttribute("data-v-0eca37cb", "");
                item.setAttribute("data-v-0eca37cb", "");

                img.setAttribute("onmousedown", "return false");

                img.classList.add("tiny");
                item.appendChild(img);
                item.appendChild(title);
                container.appendChild(item);

            });
        }

        
    },

    //displays a page containing the movie information
    display(movieID){
        let url = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=5b3048d588bba734997a5b70a2f8cd3e";
        
        axios.get(url).then((result)=>{
            let data = result.data;
            let left = document.getElementById("left");
            let right = document.getElementById("right");

            //as long as the movie has a poster, show the movie poster
            if(data.poster_path!=null){
                let img = document.createElement("img");
                img.setAttribute("srcset", "https://image.tmdb.org/t/p/original"+data.poster_path);
                img.classList.add("poster");
                left.appendChild(img);
            }

            //movie title
            let title = document.createElement("h1");
            title.appendChild(document.createTextNode(data.title + " ("+ data.release_date.substring(0,4) + ")"));
            right.appendChild(title);


            //if the original title is different (different language), display original title
            if(result.data.title.localeCompare(data.original_title) != 0){
                let originalTitle = document.createElement("h2");
                originalTitle.appendChild(document.createTextNode(data.original_title + " (original title)"));
                right.appendChild(originalTitle);
            }


            //displays general movie information
            var i;
            var movieInfo = data.runtime + " mins | ";
            for(i = 0; i < data.genres.length; i++){
                movieInfo +=  data.genres[i].name;
                if(i!=data.genres.length-1){
                    movieInfo += ", ";
                }else{
                    movieInfo += " | ";
                }
            }
            movieInfo += data.release_date + " | ";
            movieInfo += data.original_language + " (original language)";

            let info = document.createElement("h2");
            info.appendChild(document.createTextNode(movieInfo));
            right.appendChild(info);

            //making a number of stars based on the movie rating
            for(i = 0; i < Math.round(data.vote_average); i++){
                let stars = document.createElement("img");
                stars.setAttribute("srcset", "/img/star.bc59e3eb.png");
                stars.classList.add("stars");
                right.append(stars);
            }

            //shows the rating in fraction form
            let starNumber = document.createElement("p");
            starNumber.appendChild(document.createTextNode(data.vote_average +"/10"));
            right.appendChild(starNumber);


            
            //adds the movie synopsis
            var overview = document.createElement("p");
            overview.appendChild(document.createTextNode(data.overview));
            overview.classList.add("overview");
            right.appendChild(overview);

            //getting cast information and display 10 cast members in a table
            let castUrl = "https://api.themoviedb.org/3/movie/" + movieID + "/credits?api_key=5b3048d588bba734997a5b70a2f8cd3e";
            axios.get(castUrl).then((castResult)=>{
                let table = document.createElement("table");
                let hRow = document.createElement("tr");

                let hActor = document.createElement("th");
                hActor.appendChild(document.createTextNode("Actor"));
                let hRole = document.createElement("th");
                hRole.appendChild(document.createTextNode("Role"));
                hRow.appendChild(hActor);
                hRow.appendChild(hRole);

                table.appendChild(hRow);

                for(i = 0; i < 10 ; i++){
                    let newRow = document.createElement("tr");
                    let actor = document.createElement("td");
                    let role = document.createElement("td");

                    actor.appendChild(document.createTextNode(castResult.data.cast[i].name));
                    role.appendChild(document.createTextNode(castResult.data.cast[i].character));

                    newRow.appendChild(actor);
                    newRow.appendChild(role);

                    table.append(newRow);
                }

                table.classList.add("castTable");

                right.append(table);
            });


        });
    },
        
    //check if a user has favorited a movie or not and display proper bookmark tab
    checkFav(movies, movieID){
        let bookmark = document.getElementById("bookmark");
        var counter = 0;
        let img = document.createElement("i");

        if(movies==null){
            bookmark.innerHTML="";
            img.classList.add("far", "fa-bookmark");
            bookmark.appendChild(img);
            return;
        }else{
            var movieList = movies.split(",");
            for(var i = 0; i < movieList.length; i++){
                if(movieList[i]==movieID){
                    counter++;
                }
            }

            
            bookmark.innerHTML="";

            if(counter==1){
                img.classList.add("fas", "fa-bookmark");
            }else{
                img.classList.add("far", "fa-bookmark");
                
            } 
            bookmark.appendChild(img);
        }
    },

    //changing a CSV of movies to an array of movies
    parser(movies){
        var movieList = movies.split(",");

        var last = movieList[movieList.length-1];

        var i;

        var newList = [];
        var boolCheck = false;

        //checking to see if the last item can be found previously favorited
        for(i = 0; i < movieList.length-1; i++){
            if(movieList[i]!=last){
            newList.push(movieList[i]);

            }else{
            //it found a copy
                boolCheck = true;
            }
        }

        //if a copy wasn't found, add the last item to the list
        if(boolCheck == false){
            newList.push(last);
        }

        //converting the array back into a csv string
        var listString;
        listString = newList[0];

        for(i = 1 ; i < newList.length; i++){
            listString = listString + "," + newList[i];
        }

        return listString;
    },
}




