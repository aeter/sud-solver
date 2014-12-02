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
        var seen = {};
        function is_seen(n) { return (n in seen) ? false : (seen[n] = true); }
        return nums.filter(is_seen);
    }

    function get_row_indexes(index) {
        var same_row_indexes = [];
        for (var i = 0; i < 9; i++)
            same_row_indexes.push((9 * _get_row(index)) + i);
        return same_row_indexes;
    }

    function get_column_indexes(index) {
        var same_column_indexes = [];
        for (var i = 0; i < 9; i++)
            same_column_indexes.push((i * 9) + _get_column(index));
        return same_column_indexes;
    }

    function get_square_indexes(index) {
        var same_square_indexes = [];
        var row = _get_square_row(index);
        var col = _get_square_column(index);
        for (var i = 0; i < 9 * 9; i++)
            if (_get_square_row(i) === row && _get_square_column(i) === col)
                same_square_indexes.push(i);
        return same_square_indexes;
    }

    function get_related_indexes(index) {
        var indexes = get_row_indexes(index);
        indexes = indexes.concat(get_column_indexes(index));
        indexes = indexes.concat(get_square_indexes(index));
        function numeric_sort(a, b) { return a - b; }
        return _unique(indexes).sort(numeric_sort);
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

    function _get_all_combinations(board) {
        var possible_nums = {};
        for (var index = 0, len = board.length; index < len; index++)
            if (board[index] === ".")
                possible_nums[index] = get_possible_nums(index, board);
        return possible_nums;
    }

    function _prune(board) {
        var combinations = _get_all_combinations(board);
        for (var index in combinations) {
            var nums = combinations[index];
            if (nums.length === 1) {
                index = parseInt(index);
                board = _str_replace_at(index, nums[0], board);
                return _prune(board);
            }
        }
        return board;
    }

    function get_possible_nums(index, board) {
        var indexes = SUDOKU.board_math.get_related_indexes(index);

        function is_int(index) { return board[index] !== "."; }
        indexes = indexes.filter(is_int);

        function to_int(index) { return parseInt(board[index]); }
        var nums = indexes.map(to_int);

        function different_than_nums(num) { return nums.indexOf(num) === -1; }
        return [1,2,3,4,5,6,7,8,9].filter(different_than_nums);
    }

    // returns
    //   `null` - in case no solution found
    //   `str`  - a string with the solution in format "123456789453" (length=81)
    function solve(board) {
        board = _prune(board);
        var next_unknown_index = board.indexOf(".");
        if (next_unknown_index === -1) // yay resolved!
            return board;
        var possible_nums = get_possible_nums(next_unknown_index, board);
        if (possible_nums.length === 0) // bad recursion branch
            return null;
        for (var i in possible_nums) {
            board = _str_replace_at(next_unknown_index, possible_nums[i], board);
            var solution = solve(board);
            if (solution !== null)
                return solution
        }
        return null;
    }

    return {
        get_possible_nums: get_possible_nums,
        solve: solve
    };
})();
