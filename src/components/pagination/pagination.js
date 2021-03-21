import React from "react";
import { Button } from "@material-ui/core";

import "./pagination.scss";

export default function Pagination({ increment, decrement, type }) {
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        disabled={!type.decrement}
        onClick={decrement}
        className="pagination--button-back"
      >
        Назад
      </Button>
      <Button
        variant="contained"
        color="primary"
        disabled={!type.increment}
        onClick={increment}
        className="pagination--button-forward"
      >
        Вперёд
      </Button>
    </div>
  );
}
