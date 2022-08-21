export interface Node {
  online: boolean;
  name: string;
  url: string;
  loading: boolean;
  blocks: {
    loading: boolean;
    data: [
      {
        id: string;
        type: string;
        attributes: {
          index: number;
          timestamp: number;
          data: string;
          "previous-hash": string;
          hash: string;
        };
      }
    ];
  };
}
