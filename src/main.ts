const url = "http://localhost:3000";

const dropdown = document.querySelector("#pickworker") as HTMLSelectElement;

const workcontainer = document.querySelector(
  "#workcontainer",
) as HTMLDivElement;
workcontainer.innerHTML = "";
const charaboxed = document.querySelector("#charaboxed") as HTMLDivElement;
charaboxed.innerHTML = "";
const worknewlist = document.querySelector("#worknewlist") as HTMLDivElement;
worknewlist.innerHTML = "";
const workdoinglist = document.querySelector(
  "#workdoinglist",
) as HTMLDivElement;
workdoinglist.innerHTML = "";
const workdonelist = document.querySelector("#workdonelist") as HTMLDivElement;
workdonelist.innerHTML = "";

const listwork: string[] = [];

fetch(url + "/assignments")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    for (const work of data) {
      console.log(work);
      console.log(work.title);
      console.log(work.assignedto);
      listwork.push(work.assignedto);
      console.log(work.category);
      console.log(work.description);
      console.log(work.timestamp);
      console.log(work.status);

      const title = document.createElement("h2");
      const assignedto = document.createElement("p");
      const category = document.createElement("p");
      const description = document.createElement("p");
      const timestamp = document.createElement("p");
      const status = document.createElement("select");
      const remove = document.createElement("button");
      remove.innerHTML = 'Remove'
      remove.onclick = ()=>{
                  fetch(url + "/assignment/delete", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: work.id,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data, "remove assigment test");
              updateList();
            })
      }
      remove.disabled = true

      const eyeless = document.createElement("option");
      eyeless.innerHTML = "new";
      const optic = document.createElement("option");
      optic.innerHTML = "doing";
      const stalk = document.createElement("option");
      stalk.innerHTML = "done";
      if(work.status == "new") {
        stalk.disabled = true
      }
      if (work.status == "doing") {
        eyeless.disabled = true
      }
      if (work.status == "done") {
        eyeless.disabled = true, 
        optic.disabled = true
        remove.disabled = false
      }
      status.append(eyeless, optic, stalk);

      status.onchange = () => {
        fetch(url + "/assignment/move", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: status.value,
            id: work.id,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "test för att läsa listan");
            updateList();
          });
      };

      title.innerText = work.title;
      assignedto.innerText = work.assignedto;
      category.innerText = work.category;
      description.innerText = work.description;
      timestamp.innerText = work.timestamp;
      status.value = work.status;

      workcontainer.append(
        title,
        assignedto,
        category,
        description,
        timestamp,
        status,
      );

      if (work.status == "new") {
        worknewlist.append(
          title,
          assignedto,
          category,
          description,
          timestamp,
          status,
        );
      } else if (work.status == "doing") {
        workdoinglist.append(
          title,
          assignedto,
          category,
          description,
          timestamp,
          status,
        );
      } else if (work.status == "done") {
        workdonelist.append(
          title,
          assignedto,
          category,
          description,
          timestamp,
          status, remove
        );
      }
    }
    console.log(listwork);
  })
  .then(() => {
    fetch(url + "/members")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        for (const char of data) {
          if (listwork.includes(char.name)) continue;
          console.log(char.name);
          console.log(char.category);
          const option = document.createElement("option");
          option.innerHTML = char.name;
          option.value = char.name;
          dropdown.append(option);
          const name = document.createElement("h3");
          const category = document.createElement("h3");

          name.innerText = char.name;
          category.innerText = char.category;

          charaboxed.append(name, category);
        }
      });
  });
function updateList() {
  workcontainer
  worknewlist.innerHTML = "";
  workdoinglist.innerHTML = "";
  workdonelist.innerHTML = "";
  fetch(url + "/assignments")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      for (const work of data) {
        console.log(work);
        console.log(work.title);
        console.log(work.assignedto);
        listwork.push(work.assignedto);
        console.log(work.category);
        console.log(work.description);
        console.log(work.timestamp);
        console.log(work.status);

        const title = document.createElement("h2");
        const assignedto = document.createElement("p");
        const category = document.createElement("p");
        const description = document.createElement("p");
        const timestamp = document.createElement("p");
        const status = document.createElement("select");

        const eyeless = document.createElement("option");
        eyeless.innerHTML = "new";
        const optic = document.createElement("option");
        optic.innerHTML = "doing";
        const stalk = document.createElement("option");
        stalk.innerHTML = "done";
        status.append(optic, stalk, eyeless);

        status.onchange = () => {
          fetch(url + "/assignment/move", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status: status.value,
              id: work.id,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data, "test för att läsa listan");
              updateList();
            });
        };

        title.innerText = work.title;
        assignedto.innerText = work.assignedto;
        category.innerText = work.category;
        description.innerText = work.description;
        timestamp.innerText = work.timestamp;
        status.value = work.status;

        workcontainer.append(
          title,
          assignedto,
          category,
          description,
          timestamp,
          status,
        );

        if (work.status == "new") {
          worknewlist.append(
            title,
            assignedto,
            category,
            description,
            timestamp,
            status,
          );
        } else if (work.status == "doing") {
          workdoinglist.append(
            title,
            assignedto,
            category,
            description,
            timestamp,
            status,
          );
        } else if (work.status == "done") {
          workdonelist.append(
            title,
            assignedto,
            category,
            description,
            timestamp,
            status,
          );
        }
      }
      console.log(listwork);
    });
}
