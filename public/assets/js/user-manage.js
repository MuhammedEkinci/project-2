$(document).ready(function(){var o=$("#memer-name"),m=$("tbody"),i=$(".memer-container");function r(){$.get("/api/users",function(e){for(var t,r,a,n=[],d=0;d<e.length;d++)n.push((t=e[d],r=void 0,(r=$("<tr>")).data("memer",t),r.append("<td>"+t.username+"</td>"),t.CreatedMeme?r.append("<td> "+t.CreatedMeme.length+"</td>"):r.append("<td>0</td>"),r.append("<td><a href = '/memes?user_id="+t.id+"'>Go To Memes</a></td>"),r.append("<td><a href= '/create?creator_id="+t.id+"'>Create a Meme</a></td>"),r.append("<td><a style='cursor:pointer;color:red' class='delete-memer'>Delete Author</a></td>"),r));a=n,m.children().not(":last").remove(),i.children(".alert").remove(),a.length?(console.log(a),m.prepend(a)):function(){var e=$("<div>");e.addClass("alert alert-danger"),e.text("You must input a memer before making a meme"),i.append(e)}(),o.val("")})}$(document).on("submit","#memer-form",function(e){if(e.preventDefault(),console.log("pressed!!"),!o.val().trim().trim())return;!function(e){$.post("/api/users",e).then(r)}({username:o.val().trim()})}),$(document).on("click",".delete-memer",function(){var e=$(this).parent("td").parent("tr").data("memer");console.log(e);var t=e.id;$.ajax({method:"DELETE",url:"/api/users/"+t}).then(r)}),r()});