import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { getPokemon } from "../services/pokemonService";
import Button from "@mui/material/Button";
import CustomCard from "./CustomCard";
import "../Styles/card.css";

const ControlPokemon = () => {
  //useTheme
  //-----------------start---------------------------//
  //use Material UI to create breakpoint to make website responsive
  //-----------------end----------------------------//
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  //data
  //-----------------start---------------------------//
  //we store every 20 pokemon every time we called NextPage function
  //-----------------end----------------------------//

  const [data, setData] = useState([]);

  //ScrImg
  //-----------------start---------------------------//
  //use to change value of small icon for every pokemon
  //-----------------end----------------------------//

  const [ScrImg, setScrImg] = useState({ key: "", value: "" });

  //nextPage
  //-----------------start---------------------------//
  //use to store the next 20 pokemon
  //-----------------end----------------------------//

  const [nextPage, setnextPage] = useState("");

  //previousPage
  //-----------------start---------------------------//
  //use to store the previous 20 pokemon
  //-----------------end----------------------------//

  const [previousPage, setpreviousPage] = useState("");

  //disableNext
  //-----------------start---------------------------//
  //disable next button when we arrived to the last category of pokemon
  //-----------------end----------------------------//

  const [disableNext, setdisableNext] = useState(false);

  //disablePrevious
  //-----------------start---------------------------//
  //disable Previous button when we arrived to the first category of pokemon
  //-----------------end----------------------------//

  const [disablePrevious, setdisablePrevious] = useState(true);

  //PrograssBar
  //-----------------start---------------------------//
  //use to store state of Prograss Bar (show/hide)
  //-----------------end----------------------------//

  const [PrograssBar, setPrograssBar] = useState(false);

  //open
  //-----------------start---------------------------//
  //use to store state popup screen (show/hide)
  //-----------------end----------------------------//

  const [open, setOpen] = useState(false);

  //ScrMainImg
  //-----------------start---------------------------//
  //use to store path main image of pokemon
  //-----------------end----------------------------//
  const [ScrMainImg, setScrMainImg] = useState("");

  //stats
  //-----------------start---------------------------//
  //use to store stats of pokemon
  //-----------------end----------------------------//

  const [stats, setstats] = useState([{ name: "", value: "" }]);

  //held_items
  //-----------------start---------------------------//
  //use to store held_items of pokemon
  //-----------------end----------------------------//

  const [held_items, setheld_items] = useState([
    { nameItem: "no data", name: "", value: "" },
  ]);

  //idElement
  //-----------------start---------------------------//
  //use to determine which one of properties pokemon we have to show [moves,held item,evolution,stats]
  //-----------------end----------------------------//

  const [idElement, setIdElement] = useState(0);

  //evolutionGroups
  //-----------------start---------------------------//
  //use to store evolution for each pokemon
  //-----------------end----------------------------//

  const [evolutionGroups, setevolutionGroups] = useState([]);

  //moves
  //-----------------start---------------------------//
  //use to store moves for each pokemon
  //-----------------end----------------------------//

  const [moves, setmoves] = useState([]);

  //handleClickOpen
  //-----------------start---------------------------//

  // use this function to show popup screen when you click on
  //[moves,held_item,evolution,stats] buttons

  // scr = include main image of pokemon
  //dataElement = include array of 'held-items'
  // id = to determine which one was clicked from([moves,held_item,evolution,stats])
  //indexPokemon =to determine which one from pokemon was clicked

  //-----------------end-----------------------------//
  const handleClickOpen = async (src, dataElement, id, indexPokemon) => {
    setIdElement(id);
    const Store = [];
    if (id === 0) {
      const tempArr = [];
      data[indexPokemon].moves.map((moveName) =>
        tempArr.push(moveName.move.name)
      );
      setmoves(tempArr);
    } else if (id === 1) {
      setPrograssBar(true);

      let arrtemp = [];
      const res = await getPokemon(data[indexPokemon].species.url);
      const reschain = await getPokemon(res.data.evolution_chain.url);

      const { chain } = reschain.data;

      const FirstEvolutionsData = await getPokemon(
        `https://pokeapi.co/api/v2/pokemon/${chain.species.name}`
      );
      const FirstImgUrl =
        FirstEvolutionsData.data.sprites.other["official-artwork"]
          .front_default;

      arrtemp = [{ name: chain.species.name, ImgUrl: FirstImgUrl }];

      if (chain.evolves_to.length !== 0) {
        const SecondEvolutionsData = await getPokemon(
          `https://pokeapi.co/api/v2/pokemon/${chain.evolves_to[0].species.name}`
        );
        const SecondImgUrl =
          SecondEvolutionsData.data.sprites.other["official-artwork"]
            .front_default;

        arrtemp = [
          { name: chain.species.name, ImgUrl: FirstImgUrl },
          { name: chain.evolves_to[0].species.name, ImgUrl: SecondImgUrl },
        ];

        if (chain.evolves_to[0].evolves_to.length !== 0) {
          const ThirdEvolutionsData = await getPokemon(
            `https://pokeapi.co/api/v2/pokemon/${chain.evolves_to[0].evolves_to[0].species.name}`
          );
          const ThirdImgUrl =
            ThirdEvolutionsData.data.sprites.other["official-artwork"]
              .front_default;

          arrtemp = [
            { name: chain.species.name, ImgUrl: FirstImgUrl },
            { name: chain.evolves_to[0].species.name, ImgUrl: SecondImgUrl },
            {
              name: chain.evolves_to[0].evolves_to[0].species.name,
              ImgUrl: ThirdImgUrl,
            },
          ];
        }
      }

      setevolutionGroups(arrtemp);
      setPrograssBar(false);
    } else if (id === 2) {
      if (dataElement.length !== 0) {
        dataElement.map((item) =>
          item.version_details.map((detals) =>
            Store.push({
              nameItem: item.item.name,
              name: detals.version.name,
              value: detals.rarity,
            })
          )
        );
        setheld_items(Store);
      } else {
        setheld_items([{ nameItem: "no data", name: "", value: "" }]);
      }
    } else if (id === 3) {
      dataElement.map((item) =>
        Store.push({ name: item.stat.name, value: item.base_stat })
      );
      setstats(Store);
    }

    setScrMainImg(src);
    setOpen(true);
  };

  //handleClose
  //-----------------start---------------------------//
  //use this function to hide popup screen when you click on
  //-----------------end----------------------------//

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    //fetchData
    //-----------------start---------------------------//
    //loading first 20 pokemon from API
    //-----------------end----------------------------//

    const fetchData = async () => {
      setPrograssBar(true);

      //getPokemon
      //-----------------start---------------------------//
      //this is a separate file to organize API links by use 'axios'
      //-----------------end----------------------------//
      const res = await getPokemon("https://pokeapi.co/api/v2/pokemon/");
      const { results, next, previous } = res.data;

      setnextPage(next);
      setpreviousPage(previous);

      let arrAllData = [];

      for (let i = 0; i < results.length; i++) {
        let dataAPI = await getPokemon(results[i].url);

        arrAllData.push(dataAPI.data);
      }

      setData(arrAllData);
      setPrograssBar(false);
    };
    fetchData();
  }, []);

  //handelChangeImg
  //-----------------start---------------------------//
  //when you click on small icon change main Image
  //-----------------end----------------------------//
  const handelChangeImg = (key, value) => {
    const keyValue = { key, value };
    setScrImg(keyValue);
  };

  //NextPage
  //-----------------start---------------------------//
  //loading the next category from pokemon
  //-----------------end----------------------------//

  const NextPage = async () => {
    setPrograssBar(true);
    const res = await getPokemon(nextPage);
    const { results, next, previous } = res.data;

    setpreviousPage(previous);
    let arrAllData = [];
    for (let i = 0; i < results.length; i++) {
      let dataAPI = await getPokemon(results[i].url);

      arrAllData.push(dataAPI.data);
    }

    setData(arrAllData);
    setdisablePrevious(false);

    if (next != null) {
      setnextPage(next);
    } else {
      setdisableNext(true);
    }
    setPrograssBar(false);
  };

  //PreviousPage
  //-----------------start---------------------------//
  //loading the Previous category from pokemon
  //-----------------end----------------------------//
  const PreviousPage = async () => {
    setPrograssBar(true);
    const res = await getPokemon(previousPage);
    const { results, previous, next } = res.data;

    setnextPage(next);
    setpreviousPage(previous);

    let arrAllData = [];
    for (let i = 0; i < results.length; i++) {
      let dataAPI = await getPokemon(results[i].url);

      arrAllData.push(dataAPI.data);
    }
    setData(arrAllData);
    setdisableNext(false);

    if (previous != null) {
      setpreviousPage(previous);
    } else {
      setdisablePrevious(true);
    }
    setPrograssBar(false);
  };

  //HomePage
  //-----------------start---------------------------//
  //loading the first category from pokemon
  //-----------------end----------------------------//
  const HomePage = async () => {
    setPrograssBar(true);
    const res = await getPokemon("https://pokeapi.co/api/v2/pokemon/");
    const { results, next, previous } = res.data;
    setnextPage(next);
    setpreviousPage(previous);

    let arrAllData = [];
    for (let i = 0; i < results.length; i++) {
      let dataAPI = await getPokemon(results[i].url);

      arrAllData.push(dataAPI.data);
    }
    setData(arrAllData);
    setdisablePrevious(true);
    setPrograssBar(false);
  };

  //DistractionImg
  //-----------------start---------------------------//
  //used to Distracted path of main image
  //-----------------end----------------------------//
  const DistractionImg = (item) => {
    return item.sprites.other["official-artwork"].front_default;
  };
  return (
    <>
      {PrograssBar ? (
        <Box className="PrograssBar">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container className="CustomGrid">
          {isMobile ? (
            <>
              {data.map((item, indexPokemon) => (
                <Grid item xs={12} key={item.id}>
                  <CustomCard
                    mainImg={DistractionImg(item)}
                    IdMainImg={item.id}
                    smallImgKey={ScrImg.key}
                    smallImgValue={ScrImg.value}
                    itemCard={item}
                    indexPokemon={indexPokemon}
                    ChangeImg={handelChangeImg}
                    ClickOpen={handleClickOpen}
                  />
                </Grid>
              ))}
            </>
          ) : isTablet ? (
            <>
              {data.map((item, indexPokemon) => (
                <Grid item xs={6} key={item.id}>
                  <CustomCard
                    mainImg={DistractionImg(item)}
                    IdMainImg={item.id}
                    smallImgKey={ScrImg.key}
                    smallImgValue={ScrImg.value}
                    itemCard={item}
                    indexPokemon={indexPokemon}
                    ChangeImg={handelChangeImg}
                    ClickOpen={handleClickOpen}
                  />
                </Grid>
              ))}
            </>
          ) : (
            <>
              {data.map((item, indexPokemon) => (
                <Grid item xs={3} key={item.id}>
                  <CustomCard
                    mainImg={DistractionImg(item)}
                    IdMainImg={item.id}
                    smallImgKey={ScrImg.key}
                    smallImgValue={ScrImg.value}
                    itemCard={item}
                    indexPokemon={indexPokemon}
                    ChangeImg={handelChangeImg}
                    ClickOpen={handleClickOpen}
                  />
                </Grid>
              ))}
            </>
          )}

          {/* This is a Dialog to show four properties[moves,held_item,evolution,stats] */}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              <Box className="boxFull">
                <img src={ScrMainImg} alt="pokmon go" className="mainImg" />
              </Box>
            </DialogTitle>

            <DialogContent>
              {idElement === 0 ? (
                <Grid item xs={12} container spacing={1} className="CustomGrid">
                  {moves.map((moveName, indexName) => (
                    <Grid item xs={6} key={indexName}>
                      <Typography variant="h6">{moveName}</Typography>
                    </Grid>
                  ))}
                </Grid>
              ) : null}

              {idElement === 1 ? (
                <Box className="container-Box-stats">
                  <Box className="Box-Held-Item">
                    {evolutionGroups.map((evolutions, index) => (
                      <Box sx={{ width: "35%" }} key={index}>
                        <img
                          src={evolutions.ImgUrl}
                          alt="pokmon go"
                          style={{ width: "100%" }}
                        />
                        <Typography variant="h6" sx={{ textAlign: "center" }}>
                          {evolutions.name}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ) : null}

              {idElement === 2
                ? held_items.map((printHeldItem, index) => (
                    <Box className="container-Box-stats" key={index}>
                      <Box className="Box-Held-Item">
                        <Typography variant="h6">
                          {printHeldItem.nameItem}
                        </Typography>

                        <Typography variant="h6">
                          {printHeldItem.name}
                        </Typography>

                        <Typography variant="h6">
                          {printHeldItem.value}
                        </Typography>
                      </Box>
                    </Box>
                  ))
                : null}

              {idElement === 3
                ? stats.map((printStat, index) => (
                    <Box className="container-Box-stats" key={index}>
                      <Box className="Box-stats">
                        <Typography variant="h6">{printStat.name}</Typography>

                        <Typography variant="h6">{printStat.value}</Typography>
                      </Box>
                    </Box>
                  ))
                : null}
            </DialogContent>
          </Dialog>
        </Grid>
      )}
      <Box className="container-PaginationRounded">
        <Button
          variant="contained"
          style={{ margin: "10px" }}
          className="PaginationRounded"
          disabled={PrograssBar}
          onClick={() => {
            HomePage();
          }}
        >
          Home
        </Button>
        <Button
          variant="contained"
          style={{ margin: "10px" }}
          className="PaginationRounded"
          disabled={disablePrevious || PrograssBar}
          onClick={() => {
            PreviousPage();
          }}
        >
          previous
        </Button>
        <Button
          variant="contained"
          style={{ margin: "10px" }}
          className="PaginationRounded"
          disabled={disableNext || PrograssBar}
          onClick={() => NextPage()}
        >
          next
        </Button>
      </Box>
    </>
  );
};

export default ControlPokemon;
