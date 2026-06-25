import { rotas } from "@/config/ConfigRotas";
import { listaDeIcones } from "@/config/ListaDeIcones";
import { useCategoriasContext } from "@/context/hooks/UseCategoriaContext";
import { useNavigateApp } from "@/hooks/UseNavigateApp";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { BoxApp } from "../Box/BoxApp";
import { DividerApp } from "../Divider/DividerApp";
import { IconApp } from "../Icon/IconApp";
import { IconButtonApp } from "../Icon/IconButtonApp";
import { TextApp } from "../Text/TextApp";

interface propsMenuApp {
  open: boolean;
  close: () => void;
}

export function MenuApp(props: propsMenuApp) {
  const { navigate } = useNavigateApp();
  const { categorias } = useCategoriasContext()

  function navegarMenu(url: string) {
    navigate(url);
    props.close();
  }

  return (
    <Drawer open={props.open} onClose={props.close}>
      <BoxApp width="250px">
        <BoxApp
          display="flex"
          alignItems="center"
          justifyContent="end"
          padding=".5rem"
        >
          <IconButtonApp icon={listaDeIcones.close} onClick={props.close} />
        </BoxApp>
        <BoxApp>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navegarMenu(rotas.home)}>
                <ListItemIcon>
                  <IconApp icon={listaDeIcones.home} />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navegarMenu(rotas.produto)}>
                <ListItemIcon>
                  <IconApp icon={listaDeIcones.produto} />
                </ListItemIcon>
                <ListItemText primary="Todos produtos" />
              </ListItemButton>
            </ListItem>
            <DividerApp chip="Categorias" />
            {categorias.map((categoria) => (
              <ListItem key={categoria.id} disablePadding>
                <ListItemButton onClick={() => navigate(`${rotas.produto}/${categoria.descricao}`)}>

                  <ListItemText primary={categoria.descricao} />
                  <BoxApp display="flex" alignItems="center" gap="0.5rem">
                    <TextApp titulo={String(categoria.quantidadeDeProdutos)} />
                  </BoxApp>


                </ListItemButton>
              </ListItem>
            ))}
            <DividerApp />
            <ListItem disablePadding>
              <ListItemButton onClick={() => navegarMenu(rotas.minhaConta)}>
                <ListItemIcon>
                  <IconApp icon={listaDeIcones.avatar} />
                </ListItemIcon>
                <ListItemText primary="Minha conta" />
              </ListItemButton>
            </ListItem>
          </List>
        </BoxApp>
      </BoxApp>
    </Drawer>
  );
}
