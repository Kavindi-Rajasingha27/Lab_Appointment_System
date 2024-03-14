import { useContext, useEffect, useState } from "react";
import { ProviderContext } from "../../components/Provider/Provider";
import {
  addTestType, deleteTestType, getAllTestTypes,
} from "../../utils/EndpointUtils";
import "./TestTypes.css";

function TestTypes() {
  const { axiosJWT } = useContext(ProviderContext);

  const [loading, setLoading] = useState(true);
  const [testType, setTestType] = useState({
    id: "",
    type: "",
    price: "",
    paramArray: [],
  });

  const [allTestTypes, setAllTestTypes] = useState([]);

  useEffect(() => {
    getAllTestTypes(axiosJWT)
      .then((response) => {
        setAllTestTypes(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching test types:", error);
        setLoading(false);
      });
  }, [axiosJWT]);

  return (
    <div style={{ marginRight: 42, marginTop: 0 }}>
      <h1
        style={{
          color: "#198754",
          fontWeight: "900",
          fontSize: 45,
          marginBottom: 0,
        }}
      >
        Test Types
      </h1>
      <hr class="mt-0 mb-4" />
      <div class="row">
        <div class="col-xl-12">
          <div class="card mb-4">
            <div class="card-header">Insert New Test Type</div>
            <div class="card-body">
              <form>
                <div class="row gx-3 mb-3">
                  <div class="col-md-6">
                    <label class="small mb-1" for="inputFirstName">
                      Test Type Name<span className="text-danger">*</span>
                    </label>
                    <input
                      class="form-control"
                      id="inputFirstName"
                      type="text"
                      value={testType.type}
                      onChange={(e) =>
                        setTestType((prevTestType) => ({
                          ...prevTestType,
                          type: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div class="row gx-3 mb-3">
                  <div class="col-md-6">
                    <label class="small mb-1" for="inputFirstName">
                      Price<span className="text-danger">*</span>
                    </label>
                    <input
                      class="form-control"
                      id="inputFirstName"
                      type="number"
                      value={testType.price}
                      onChange={(e) =>
                        setTestType((prevTestType) => ({
                          ...prevTestType,
                          price: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div class="row gx-3 mb-3">
                  <div class="col-md-6">
                    <label class="small mb-1" for="inputParameters">
                      Parameters<span className="text-danger">*</span>
                    </label>
                    {testType.paramArray.map((param, index) => (
                      <div key={index} className="mb-2">
                        <input
                          class="form-control"
                          type="text"
                          value={param}
                          onChange={(e) => {
                            const updatedParams = [...testType.paramArray];
                            updatedParams[index] = e.target.value;
                            setTestType((prevTestType) => ({
                              ...prevTestType,
                              paramArray: updatedParams,
                            }));
                          }}
                        />
                      </div>
                    ))}
                    <div>
                      <button
                        class="btn btn-primary"
                        type="button"
                        onClick={() =>
                          setTestType((prevTestType) => ({
                            ...prevTestType,
                            paramArray: [...prevTestType.paramArray, ""],
                          }))
                        }
                      >
                        Add Parameter
                      </button>
                      <button
                        class="btn btn-danger mx-5"
                        type="button"
                        onClick={() =>
                          setTestType((prevTestType) => ({
                            ...prevTestType,
                            paramArray: [],
                          }))
                        }
                      >
                        Clear Parameters
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  class="btn btn-success mt-5"
                  type="button"
                  onClick={() => addTestType(axiosJWT, testType)}
                >
                  Submit TestType
                </button>
              </form>
            </div>
          </div>
          <div class="card mb-4">
            <div class="card-header">All Test Types</div>
            <div class="card-body">
              <div>
                <ul className="test-types-list">
                  {allTestTypes.map((testType) => (
                    <li key={testType.id} className="test-type-item">
                      <strong>{testType.type}</strong> - Price: Rs. {testType.price}.00
                      <ul className="parameters-list mx-5">
                        {testType.paramArray.map((param, index) => (
                          <li key={index}>{param}</li>
                        ))}
                      </ul>
                      <button
                        class="btn btn-danger"
                        type="button"
                        onClick={() => deleteTestType(axiosJWT, testType.id)}
                      >
                        delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default TestTypes;
