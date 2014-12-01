/* Copyright 2014 Adrian Nackov
 * Released under BSD Licence (2 clause):
 * http://www.opensource.org/licenses/bsd-license.php
 */

var SUDOKU = SUDOKU || {};
        
SUDOKU.board_math = (function() {
    // a board is represented as a string of nums and dots,
    // board = "1.2...3452..451..6" <- first and second row
    // a board has 9 rows, 9 columns (and thus 9 squares of 9 digits each)

    function _get_column(i) { return i % 9; }
    function _get_row(i) { return parseInt(i / 9); }
    function _get_square_row(i) { return parseInt(_get_row(i) / 3); }
    function _get_square_column(i) { return parseInt(_get_column(i) / 3); }

    function _unique(nums) {
        var unique = {};
        return nums.filter(function(num) {
            return (num in unique) ? false : (unique[num] = true);
        });
    }

    function get_row_indexes(index) {
        var same_row_indexes = [];
        for (var i = 0; i < 9; i++) {
            same_row_indexes.push((9 * _get_row(index)) + i);
        }
        return same_row_indexes;
    }

    function get_column_indexes(index) {
        var same_column_indexes = [];
        for (var i = 0; i < 9; i++) {
            same_column_indexes.push((i * 9) + _get_column(index));
        }
        return same_column_indexes;
    }

    function get_square_indexes(index) {
        var same_square_indexes = [];
        var row = _get_square_row(index);
        var col = _get_square_column(index);
        for (var i = 0; i < 9 * 9; i++) {
            if (_get_square_row(i) === row && _get_square_column(i) === col) {
                same_square_indexes.push(i);
            }
        }
        return same_square_indexes;
    }

    function get_related_indexes(index) {
        var indexes = get_row_indexes(index);
        indexes = indexes.concat(get_column_indexes(index));
        indexes = indexes.concat(get_square_indexes(index));
        indexes = _unique(indexes).sort();
        return indexes;
    }

    return {
        get_row_indexes: get_row_indexes,
        get_column_indexes: get_column_indexes,
        get_square_indexes: get_square_indexes,
        get_related_indexes: get_related_indexes
    };
})();


SUDOKU.solver = (function() {
    // javascript strings are immutable, this fn does "str[i] = new_val"
    function _str_replace_at(i, new_val, str) {
        return str.substr(0, i) + new_val + str.substr(i + 1);
    }

    function _get_all_possible_nums(board) {
        var possible_nums = {};
        for (var index = 0; index < 80; index++)
            if (board[index] === ".")
                possible_nums[index] = get_possible_nums(index, board);
        return possible_nums;
    }

    function _update_solutions(possible_nums, board) {
        for (var index in possible_nums) {
            var nums = possible_nums[index];
            if (nums.length === 1) {
                index = parseInt(index);
                board = _str_replace_at(index, nums[0], board);
            }
        }
        return board;
    }

    function get_possible_nums(index, board) {
        var indexes = SUDOKU.board_math.get_related_indexes(index);
        var indexes_with_nums = indexes.filter(
            function(i) { return board[i] !== "."; }
        );
        var nums = indexes_with_nums.map(
            function(i) { return parseInt(board[i]); }
        );
        return [1,2,3,4,5,6,7,8,9].filter(
            function(num) { return nums.indexOf(num) === -1; }
        );
    }

    function solve(board) {
        while (board.indexOf(".") > -1) {
            var possible_nums = _get_all_possible_nums(board);
            board = _update_solutions(possible_nums, board);
            console.log(board);
            break;
            if (board.indexOf(".") > -1) {
                // TODO backtracking
            }
        }
        return board;
    }

    return {
        get_possible_nums: get_possible_nums,
        solve: solve
    };
})();
