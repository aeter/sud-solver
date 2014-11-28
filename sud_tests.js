/* Copyright 2014 Adrian Nackov
 * Released under BSD Licence (2 clause):
 * http://www.opensource.org/licenses/bsd-license.php
 */

QUnit.test("SUDOKU.board.get_row_indexes", function(assert) {
    // test first row
    assert.deepEqual(SUDOKU.board.get_row_indexes(0),
                    [0, 1, 2, 3, 4, 5, 6, 7, 8],
                    "First row indexes, begining(0)");
    assert.deepEqual(SUDOKU.board.get_row_indexes(5),
                    [0, 1, 2, 3, 4, 5, 6, 7, 8],
                    "First row indexes, middle(5)");
    assert.deepEqual(SUDOKU.board.get_row_indexes(8),
                    [0, 1, 2, 3, 4, 5, 6, 7, 8],
                    "First row indexes, end(8)");
    // test intermediate (second) row
    assert.deepEqual(SUDOKU.board.get_row_indexes(9),
                    [9, 10, 11, 12, 13, 14, 15, 16, 17],
                    "Second row indexes, beginning(9)");
    assert.deepEqual(SUDOKU.board.get_row_indexes(17),
                    [9, 10, 11, 12, 13, 14, 15, 16, 17],
                    "Second row indexes, end(17)");
    // test last row
    assert.deepEqual(SUDOKU.board.get_row_indexes(80),
                    [72, 73, 74, 75, 76, 77, 78, 79, 80],
                    "Last row indexes, end(80)");
    assert.deepEqual(SUDOKU.board.get_row_indexes(72),
                    [72, 73, 74, 75, 76, 77, 78, 79, 80],
                    "Last row indexes, begining(72)");
});

QUnit.test("SUDOKU.board.get_column_indexes", function(assert) {
    // test first column
    assert.deepEqual(SUDOKU.board.get_column_indexes(0),
                    [0, 9, 18, 27, 36, 45, 54, 63, 72],
                    "First column indexes, beginning(0)");
    assert.deepEqual(SUDOKU.board.get_column_indexes(72),
                    [0, 9, 18, 27, 36, 45, 54, 63, 72],
                    "First column indexes, end(72)");
    // test intermediate (third) column
    assert.deepEqual(SUDOKU.board.get_column_indexes(2),
                    [2, 11, 20, 29, 38, 47, 56, 65, 74],
                    "Third column indexes, beginning(2)");
    assert.deepEqual(SUDOKU.board.get_column_indexes(74),
                    [2, 11, 20, 29, 38, 47, 56, 65, 74],
                    "Third column indexes, end(74)");
    // test last column
    assert.deepEqual(SUDOKU.board.get_column_indexes(80),
                    [8, 17,26, 35, 44, 53, 62, 71, 80],
                    "Last column indexes, end(80)");

});

QUnit.test("SUDOKU.board.get_same_square_indexes", function(assert) {
    // test left-top square (first square of 9)
    assert.deepEqual(SUDOKU.board.get_square_indexes(9),
                    [0, 1, 2, 9, 10, 11, 18, 19, 20],
                    "Left-top square indexes, middle(9)");
    assert.deepEqual(SUDOKU.board.get_square_indexes(20),
                    [0, 1, 2, 9, 10, 11, 18, 19, 20],
                    "Left-top square indexes, end(20)");
    assert.deepEqual(SUDOKU.board.get_square_indexes(80),
                    [60, 61, 62, 69, 70, 71, 78, 79, 80],
                    "Bottom-right square indexes, end(80)");
});

QUnit.test("SUDOKU.solver.solve", function(assert) {
    SUDOKU.solver.init("..."); // TODO
    assert.deepEqual(SUDOKU.solver.solve(), "", "ERROR");
});