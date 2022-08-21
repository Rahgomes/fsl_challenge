import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import colors from "../constants/colors";
import Status from "./Status";
import { Node as NodeType } from "../types/Node";

type Props = {
  node: NodeType;
  expanded: boolean;
  toggleNodeExpanded: (node: NodeType) => void;
  opened: boolean;
};

const AccordionRoot = styled(Accordion)({
  margin: "16px 0",
  boxShadow: "0px 3px 6px 1px rgba(0,0,0,0.15)",

  "&:before": {
    backgroundColor: "unset",
  },
});

const AccordionSummaryContainer = styled(AccordionSummary)({
  padding: "0 24px",
  "& .MuiAccordionSummary-content": {
    margin: "10px 0 !important", // Avoid change of sizing on expanded
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: colors.faded,
  },
});

const BoxSummaryContent = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  paddingRight: 20,
});

const TypographyHeading = styled(Typography)({
  fontSize: 17,
  display: "block",
  color: colors.text,
  lineHeight: 1.5,
});

const TypographySecondaryHeading = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: colors.faded,
  lineHeight: 2,
}));

const BoxBlockContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  borderRadius: "2px",
  marginBottom: "8px",
  padding: "4px",
  background: "rgba(0, 0, 0, 0.12)",
});

const TypographyListBlockIndex = styled(Typography)({
  fontSize: 10,
  color: "#304FFE",
  lineHeight: "16px",
  fontWeight: 700,
  fontStyle: "normal",
  fontFamily: "Roboto",
  letterSpacing: "1.5px",
  textTransform: "uppercase",
});

const TypographyListBlockText = styled(Typography)({
  fontSize: "14px",
  color: "#263238",
  lineHeight: "20px",
  fontWeight: 400,
  fontStyle: "normal",
  fontFamily: "Roboto",
  letterSpacing: "0.25px",
});

const Node: React.FC<Props> = ({
  node,
  expanded,
  toggleNodeExpanded,
  opened,
}) => {
  return (
    <AccordionRoot
      elevation={3}
      expanded={expanded}
      onChange={() => toggleNodeExpanded(node)}
    >
      <AccordionSummaryContainer expandIcon={<ExpandMoreIcon />}>
        <BoxSummaryContent>
          <Box>
            <TypographyHeading variant="h5">
              {node.name || "Unknown"}
            </TypographyHeading>
            <TypographySecondaryHeading variant="subtitle1">
              {node.url}
            </TypographySecondaryHeading>
          </Box>
          <Status loading={node.loading} online={node.online} />
        </BoxSummaryContent>
      </AccordionSummaryContainer>
      <AccordionDetails>
        {opened &&
          node.blocks.data.map(
            (block) =>
              block.id && (
                <BoxBlockContent key={block.id}>
                  <TypographyListBlockIndex>
                    00{block.attributes.index}
                  </TypographyListBlockIndex>
                  <TypographyListBlockText>
                    {block.attributes.data}
                  </TypographyListBlockText>
                </BoxBlockContent>
              )
          )}
      </AccordionDetails>
    </AccordionRoot>
  );
};

export default Node;
