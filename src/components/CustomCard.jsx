import Card from "@mui/material/Card";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

//AllProps
//-----------------start---------------------------//
//use to distracted props from 'ControlPokemon' Components
//-----------------end----------------------------//
const CustomCard = ({ ...AllProps }) => {
  const {
    mainImg,
    smallImgKey,
    IdMainImg,
    smallImgValue,
    itemCard,
    indexPokemon,
    ChangeImg,
    ClickOpen,
  } = AllProps;

  return (
    <>
      <Card className="customeCard">
        <Box className="boxFull">
          <img
            src={smallImgKey === IdMainImg ? smallImgValue : null || mainImg}
            alt="pokemon go"
            className="mainImg"
          />
        </Box>

        <Box className="boxFull">
          <Grid container className="CustomGrid">
            <Grid item xs={12}>
              {Object.entries(itemCard.sprites).map(([key, value], index) =>
                value != null && key !== "other" && key !== "versions" ? (
                  <img
                    key={index}
                    src={value}
                    alt="pokemon go"
                    className="smallImg"
                    onClick={() => ChangeImg(itemCard.id, value)}
                  />
                ) : null
              )}
            </Grid>
          </Grid>
        </Box>

        <Box className="boxFull">
          <Grid container spacing={1} className="CustomGrid">
            <Grid item xs={12}>
              <Typography variant="h6" color="primary">
                {itemCard.species.name}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography
                variant="h6"
                color="white"
                onClick={() =>
                  ClickOpen(mainImg, itemCard.held_items, 0, indexPokemon)
                }
                className="moves"
              >
                moves
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography
                variant="h6"
                color="white"
                onClick={() =>
                  ClickOpen(mainImg, itemCard.held_items, 1, indexPokemon)
                }
                className="evolutions"
              >
                evolutions
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography
                variant="h6"
                color="white"
                onClick={() => ClickOpen(mainImg, itemCard.held_items, 2)}
                className="held-items"
              >
                held items
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography
                variant="h6"
                color="white"
                onClick={() => ClickOpen(mainImg, itemCard.stats, 3)}
                className="stats"
              >
                stats
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
};

export default CustomCard;
