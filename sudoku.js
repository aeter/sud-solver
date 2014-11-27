/* Copyright 2014 Adrian Nackov
 * Released under BSD Licence (2 clause):
 * http://www.opensource.org/licenses/bsd-license.php
 */

var SUDOKU = SUDOKU || {};
        
SUDOKU.board = (function() {
    // a board is represented as a string of nums and dots,
    // board = "1.2...3452..451..6" <- first and second row
    // a board has 9 rows, 9 columns (and thus 9 squares of 9 digits each)

    function _get_column(i) { return i % 9; }
    function _get_row(i) { return parseInt(i / 9); }
    function _get_square_row(i) { return parseInt(_get_row(i) / 3); }
    function _get_square_column(i) { return parseInt(_get_column(i) / 3); }

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
            if (_get_square_row(i) == row && _get_square_column(i) == col) {
                same_square_indexes.push(i);
            }
        }
        return same_square_indexes;
    }

    return {
        get_row_indexes: get_row_indexes,
        get_column_indexes: get_column_indexes,
        get_square_indexes: get_square_indexes
    };
})();


SUDOKU.solver = (function() {
    var _nums = "";

    function _get_possible_nums(index) {
        var possible_nums = [];
        // TODO
        return possible_nums;
    }

    function init(nums) { _nums = nums; }

    function solve() {
        // board_with_nums = "14.23.6.." etc.
        for (var i = 0; i < 80; i++) {
            if (_nums[i] == ".") {
                var solutions = _get_possible_nums(i);
                if (solutions.length == 1) {
                    board_with_nums[i] = solutions[0];
                    i = 0; // restart the loop
                }
            }
        }
        // TODO
    }

    return {
        init: init,
        solve: solve
    };
})();
