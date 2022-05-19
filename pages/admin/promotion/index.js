import React, { useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { useRouter } from "next/router";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "@mui/material/Button";
import { data } from "autoprefixer";
// import {updatePromo} from "../../api/promotion"
import { PrismaClient } from "@prisma/client";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "13px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  tablecell: {
    fontSize: "10px",
  },
};

function PromotionPage(props) {
  const { promotions } = props;
  const [promotionList, setPromotionList] = useState(promotions);

  const useStyles = makeStyles(styles);
  const classes = useStyles();

  async function handleDelete(id) {
    console.log("deleteddID", id);
    if (confirm("Are you sure to delete this promotion?")) {
      const response = await fetch("/api/promotion/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        alert("Something went wrong!");
        console.error("error", response);
        return;
      }

      // Also delete from the state to maintain consistency with frontend UI and database
      const newPromotionList = promotionList.filter((p) => p.id !== id);
      setPromotionList(newPromotionList);
    }
  }

  function timeFormat(time) {
    let newTime = new Date(time).toLocaleString("en-GB", { timeZone: "UTC" });
    return newTime;
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <h2 className="text-2xl font-bold">Promotion</h2>
        <Card>
          {/* <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Promotions</h4>
          </CardHeader> */}
          <CardBody>
            <Button variant="outlined" href="/admin/promotion/new">
              Add
            </Button>

            <Table className="text-sm table-fixed">
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Headline</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Created by</TableCell>
                  <TableCell align="center">Created at</TableCell>
                  <TableCell align="center">Start at</TableCell>
                  <TableCell align="center">End at</TableCell>
                  <TableCell align="center">Image Url</TableCell>
                  <TableCell align="center">Edit</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {promotionList.map((m, i) => {
                  return (
                    <TableRow key={i} text-xs>
                      <TableCell align="center">{m.id}</TableCell>
                      <TableCell align="center">{m.headline}</TableCell>
                      <TableCell align="center">{m.description}</TableCell>
                      <TableCell align="center">{m.created_by_id}</TableCell>
                      <TableCell align="center">{timeFormat(m.created_at)}</TableCell>
                      <TableCell align="center">{timeFormat(m.start_at)}</TableCell>
                      <TableCell align="center">{timeFormat(m.end_at)}</TableCell>
                      <TableCell align="center">
                        <img src={m.image_url} />
                      </TableCell>
                      <TableCell align="center">
                        <Button variant="outlined" href={"/admin/promotion/" + m.id}>
                          {" "}
                          Edit{" "}
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button variant="outlined" onClick={() => handleDelete(m.id)}>
                          {" "}
                          Delete{" "}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

PromotionPage.layout = Admin;

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  var allPromotions = await prisma.MerchantStorefront_promotion.findMany({
    orderBy: {
      start_at: "desc",
    },
  });

  allPromotions = JSON.parse(
    JSON.stringify(allPromotions, (key, value) => (typeof value === "bigint" ? value.toString() : value))
  );

  console.log("promotions: ", allPromotions[0]);

  return {
    props: {
      promotions: allPromotions,
    },
  };
}

export default PromotionPage;
