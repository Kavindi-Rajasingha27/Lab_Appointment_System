import { Button, CardActionArea, CardActions, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { AiFillDelete } from "react-icons/ai";
import { deleteUser } from "../../utils/EndpointUtils";
import { ProviderContext } from "../Provider/Provider";

const DoctorList = ({ doctorsLst, openModal, userType }) => {
  const { axiosJWT } = useContext(ProviderContext);
  return (
    <>
      <Grid container spacing={2}>
        {doctorsLst !== null &&
          doctorsLst.map((doctor) => (
            <Grid item xs={12} sm={6} md={3} spacing={1} key={doctor.email}>
              <Card
                sx={{ maxWidth: 250, minWidth: 240}}
                style={{ marginBottom: "30px", border: "solid 1px green" }}
              >
                <CardActionArea onClick={() => openModal(doctor)}>
                  <CardMedia
                    component="img"
                    height="200"
                    image="https://www.seekpng.com/png/detail/131-1314988_icon-consulting-anonymous-proxy-icon.png"
                    alt="IT doctor"
                  />
                  <CardContent style={{ height: 140 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      style={{
                        color: "#198700",
                        textTransform: "capitalize",
                        fontWeight: "500",
                      }}
                    >
                      {doctor.name}
                    </Typography>
                    <Typography
                      variant="body4"
                      color="text.secondary"
                      style={{ fontSize: "20px" , fontWeight: "500"}}
                    >
                      <span>{doctor.firstName} {doctor.lastName}</span>
                    </Typography>
                    <br />
                    <Typography
                      variant="body4"
                      color="text.secondary"
                      style={{ fontSize: "14px" }}
                    >
                      <b>Position:</b> <span>{doctor.role}</span>
                    </Typography>
                    <br />
                    <Typography
                      variant="body4"
                      color="text.secondary"
                      style={{ fontSize: "14px" }}
                    >
                      <b>Age:</b> <span>{doctor.age}</span>
                    </Typography>
                    <br />
                    <Typography
                      variant="body4"
                      color="text.secondary"
                      style={{ fontSize: "14px" }}
                    >
                      <b>Gender:</b> <span>{doctor.gender}</span>
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions style={{ position: "relative", height: 55 }}>
                  {userType === "admin" && (
                    <Button
                      size="small"
                      style={{
                        color: "white",
                        backgroundColor: "#DC3545",
                        textTransform: "capitalize",
                        position: "absolute",
                        right: 15,
                        bottom: 8,
                      }}
                      onClick={() =>
                        deleteUser(
                          axiosJWT,
                          "DOCTOR",
                          doctor.id,
                          doctor.name
                        )
                      }
                    >
                      <AiFillDelete
                        style={{ marginBottom: "4px", marginRight: "4px" }}
                      />
                      Delete&nbsp;
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default DoctorList;
