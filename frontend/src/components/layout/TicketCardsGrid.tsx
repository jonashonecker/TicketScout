import { Box, Grow, useMediaQuery, useTheme } from "@mui/material";
import { Ticket } from "../../types/Ticket.ts";
import TicketCard from "../card/TicketCard.tsx";

type TicketCardsGridProps = {
  searchResults: Ticket[] | undefined;
};

export default function TicketCardsGrid({
  searchResults,
}: TicketCardsGridProps) {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));

  let columnsCount;
  if (isXs) {
    columnsCount = 1;
  } else if (isSm) {
    columnsCount = 2;
  } else if (isMd) {
    columnsCount = 3;
  } else {
    columnsCount = 4;
  }

  const columns: Ticket[][] = Array.from({ length: columnsCount }, () => []);

  // Distribute items into columns
  searchResults?.forEach((ticket, index) => {
    columns[index % columnsCount].push(ticket);
  });

  return (
    <Box display="flex" gap={{ xs: 2, md: 3 }}>
      {columns.map((column, colIndex) => (
        <Box
          key={colIndex}
          display="flex"
          flexDirection="column"
          gap={{ xs: 2, md: 3 }}
          sx={{ width: `${100 / columnsCount}%` }}
        >
          {column.map((ticket, index) => (
            <Grow in={true} timeout={500 + index * 100} key={ticket.id}>
              <Box>
                <TicketCard ticket={ticket} />
              </Box>
            </Grow>
          ))}
        </Box>
      ))}
    </Box>
  );
}
