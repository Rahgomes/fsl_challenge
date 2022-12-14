import React, { useState, useEffect } from "react";
import { Node as NodeType } from "../types/Node";
import Node from "../components/Node";
import { Typography, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store/configureStore";
import {
  checkNodesStatus,
  checkNodesBlocks,
  selectNodes,
} from "../reducers/nodes";

export const Nodes: React.FC = () => {
  const [expandedNodeURL, setExpandedNodeURL] = useState<null | string>(null);
  const [flagEnableBlock, setFlagEnableBlock] = useState<boolean>(false);
  const dispatch = useDispatch();
  const nodes = useAppSelector(selectNodes);

  useEffect(() => {
    dispatch(checkNodesStatus(nodes));
    dispatch(checkNodesBlocks(nodes));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleNodeExpanded(node: NodeType) {
    setExpandedNodeURL(node.url === expandedNodeURL ? null : node.url);
    setFlagEnableBlock((prev) => {
      if (!(node.url === expandedNodeURL)) {
        prev = true;
      } else {
        prev = false;
      }

      return prev;
    });
  }

  return (
    <Box paddingTop={7}>
      <Typography variant="h4" component="h1">
        <strong style={{ color: "#000" }}>Nodes</strong>
      </Typography>
      {nodes.map((node) => (
        <Node
          node={node}
          key={node.url}
          expanded={node.url === expandedNodeURL}
          toggleNodeExpanded={toggleNodeExpanded}
          opened={flagEnableBlock}
        />
      ))}
    </Box>
  );
};

export default Nodes;
