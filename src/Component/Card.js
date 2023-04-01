import React, { useState } from "react";
import Header from "./Header";
import toast, { Toaster } from "react-hot-toast";

function Card() {
  const [fields, setFields] = useState([{ value: "" }]);
  const [segmentname, setSegmentname] = useState("");
  const [rendr, setRendr] = useState(false);
  const options = [
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ];

  function findLabel(val) {
    if (options.filter((dt) => dt.value === val).length) {
      return options.filter((dt) => dt.value === val)[0].label;
    } else {
      toast.error("Please Select the Fields");
    }
  }
  function saveSegment() {
    let schema = fields.map((data) => {
      if (data.value) {
        return { [data.value]: findLabel(data.value) };
      } else {
        return undefined
      }
    });

    let reqData = {
      segment_name: segmentname,
      schema,
    };

    if (reqData.segment_name !== "") {
      console.log("dd", reqData.schema[0])
      if (reqData.schema[0] !== undefined) {
        fetch("https://webhook.site/6dff3bc9-7e18-4e65-a1d9-562d335fce10", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqData),
        })
          .then((response) => {
            response.json();
            response.status === 200
              ? toast.success("Data Summitted Successfuly")
              : toast.error("Something went to wrong");
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        toast.error("Please Select the Fields");
      }
    } else {
      toast.error("Please Enter the Segment Name");
    }
  }
  return (
    <div
      className="modal fade ams-popup"
      id="Card"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-xl float-end">
        <div className="modal-content" role="document">
          <div class="card wh-size">
            <div className="card-body p-0 m-0">
              <Header title={"Saving Segment"} />
              <div className="mx-4 my-4">
                <div className="my-2">
                  <label>Enter the Name of the Segment</label>
                  <input
                    required="required"
                    className="form-control my-2 mx-0"
                    type="text"
                    name="Name"
                    onBlur={(e) => setSegmentname(e.target.value)}
                    placeholder="Name of the Segment"
                  />
                </div>
                <div>
                  <label>
                    To Save your segment,you need to add the schemas <br /> to
                    build the query
                  </label>
                </div>
                <div className="d-flex justify-content-end">
                  <div className="d-flex align-items-center my-4">
                    <div className="green-circle mx-1" />
                    <label> - User Traits</label>
                    <div className="red-circle mx-1" />
                    <label> - Group Traits</label>
                  </div>
                </div>
                <div className="b-blue">
                  {fields.map((data, i) => {
                    return (
                      <div className="d-flex align-items-center my-4" key={i}>
                        <div className="green-circle mx-2" />
                        <select
                          class="form-select"
                          value={data.value}
                          onChange={(e) => {
                            data.value = e.target.value;
                            setRendr(!rendr);
                          }}
                        >
                          <div className="green-circle mx-2" />

                          <option selected>Select</option>
                          {options.map((dh, j) => (
                            <option key={j} value={dh.value}>
                              {dh.label}
                            </option>
                          ))}
                        </select>
                        <div
                          className="minus-box mx-2"
                          onClick={() => {
                            let temp = [...fields];
                            temp.splice(i, 1);
                            setFields(temp);
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
                <button
                  className="btn-link my-4"
                  onClick={() => setFields([...fields, { value: "" }])}
                >
                  <h6>+Add new schema</h6>
                </button>

                <div className="my-4">
                  <button
                    className="btn btn-success text-white"
                    onClick={() => saveSegment()}
                  >
                    Save the Segment
                  </button>
                  <button
                    className="mx-4 btn btn-white text-danger"
                    data-bs-dismiss="modal"
                    onClick={() => setFields([{ value: "" }])}
                  >
                    Cancel
                  </button>
                  <Toaster />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
