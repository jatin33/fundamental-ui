import { useEffect, useReducer } from "react";
import "./snake.css";

// game over - when snake touches itself
function getInitBoard() {
    const rows = Array.from({ length: 10 }, () => []);
    const columns = Array.from({ length: 10 }, () => "_");

    return rows.map((row) => [...columns]);
}

// _ -> default
// x -> snake
// + -> fruit

enum DIRECTIONS {
    UP = "up",
    DOWN = "down",
    RIGHT = "right",
    LEFT = "left"
}

function getInitSnakeHead() {
    return [Math.floor(Math.random() * 9), Math.floor(Math.random() * 9)];
};

function getFruitPosition() {
    return [Math.floor(Math.random() * 9), Math.floor(Math.random() * 9)]
}

function getInitState() {
    return {
        direction: DIRECTIONS.RIGHT,
        board: getInitBoard(),
        snake: [getInitSnakeHead()],
        fruit: getFruitPosition()
    }
};


function getSnake(state) {
    const { direction, snake, board } = state;
    const rows = board.length;
    const cols = board[0].length;

    return snake.map((snakeHead: any) => {
        switch (direction) {
            case DIRECTIONS.RIGHT:
                return [snakeHead[0], (snakeHead[1] + 1) % cols];
            case DIRECTIONS.LEFT:
                return [snakeHead[0], snakeHead[1] === 0 ? cols - 1 : snakeHead[1] - 1];
            case DIRECTIONS.UP:
                return [snakeHead[0] === 0 ? rows - 1 : snakeHead[0] - 1, snakeHead[1]];
            case DIRECTIONS.DOWN:
                return [(snakeHead[0] + 1) % rows, snakeHead[1]];
        }
    })
}

function appendSnake(state) {
    // find the last item in snake
    // based on position add next posiition in snake array
    const { direction, snake } = state;
    const snakeTail = snake[snake.length - 1];

    const newTail = [];

    switch (direction) {
        case DIRECTIONS.RIGHT:
            newTail.push(snakeTail[0], snakeTail[1] - 1);
            break;
        case DIRECTIONS.LEFT:
            newTail.push(snakeTail[0], snakeTail[1] + 1);
            break;
        case DIRECTIONS.UP:
            newTail.push(snakeTail[0] + 1, snakeTail[1]);
            break;
        case DIRECTIONS.DOWN:
            newTail.push(snakeTail[0] - 1, snakeTail[1]);
            break;
    }
    console.log({
        newTail
    });
    console.log({
        result: [...snake, newTail],
    })
    return [...snake, newTail];
    // return [...snake, fruit]
}

function reducer(state, action) {
    const { type, payload } = action;
    switch (type) {
        case "MOVE":
            return {
                ...state,
                snake: getSnake(state)
            }
        case "CHANGE_DIRECTION":
            return {
                ...state,
                direction: payload.direction
            }
        case "APPEND_SNAKE":
            return {
                ...state,
                fruit: getFruitPosition(),
                snake: appendSnake(state)
            }
    }
};

const isRequiredPosition = (positions, rIdx, cIdx) => {
    const [x, y] = positions;

    return x === rIdx && y === cIdx;
};

function Snake() {
    // create the board - 10 x 10
    // direction, speed state
    // define snake - array of positions, position - (x,y)
    // position fruit on the board - static x,y
    const [state, dispatch] = useReducer(reducer, getInitState());

    useEffect(() => {
        // layout fruit randomly
        const id = setInterval(() => {
            dispatch({
                type: "MOVE",
            })
        }, 1000);

        const handleKeyDown = (e) => {
            const key = e.key;

            switch (key) {
                case "ArrowUp":
                    dispatch({
                        type: "CHANGE_DIRECTION",
                        payload: {
                            direction: DIRECTIONS.UP,
                        }
                    })
                    break;
                case "ArrowLeft":
                    dispatch({
                        type: "CHANGE_DIRECTION",
                        payload: {
                            direction: DIRECTIONS.LEFT,
                        }
                    })
                    break;
                case "ArrowRight":
                    dispatch({
                        type: "CHANGE_DIRECTION",
                        payload: {
                            direction: DIRECTIONS.RIGHT,
                        }
                    })
                    break;
                case "ArrowDown":
                    dispatch({
                        type: "CHANGE_DIRECTION",
                        payload: {
                            direction: DIRECTIONS.DOWN,
                        }
                    })
                    break;
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            clearInterval(id);
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, []);


    function isSnakeCell(rIdx, cIdx) {
        const snakePositions = state.snake;

        return snakePositions.some((positions) => isRequiredPosition(positions, rIdx, cIdx));
    }

    function isFruit(rIdx, cIdx) {
        const positions = state.fruit;

        return isRequiredPosition(positions, rIdx, cIdx);
    }

    function doesSnakeEatFruit() {
        const positionsSnakeHead = state.snake[0];
        const positionsFruit = state.fruit;

        return (positionsSnakeHead[0] === positionsFruit[0]) && (positionsSnakeHead[1] === positionsFruit[1]);
    }

    const isSnakeBiting = doesSnakeEatFruit();

    useEffect(() => {
        console.log("isSnakeBiting>>", isSnakeBiting);

        if (isSnakeBiting) {
            // append the fruit as part of snake
            // - pick the last 

            // reset the fruit
            dispatch({
                type: "APPEND_SNAKE"
            });

        }
    }, [isSnakeBiting]);

    console.log("snake>>", state.snake);

    return <div className="wrapper">
        <div className="board">
            {state.board.map((row, rIdx) => row.map((col, cIdx) => <div
                key={`${rIdx}_${cIdx}`}
                className={`base ${isSnakeCell(rIdx, cIdx) ? "snake" : ""} 
                    ${isFruit(rIdx, cIdx) ? "fruit" : ""}`}>
            </div>))
            }</div>
    </div>
}

export default Snake;