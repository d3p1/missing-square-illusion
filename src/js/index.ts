/**
 * @description App
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {Poly, Point} from './types'

class App {
  /**
   * @type {number}
   */
  cellSize: number

  /**
   * @type {number}
   */
  rows: number

  /**
   * @type {number}
   */
  cols: number

  /**
   * @type {CanvasRenderingContext2D}
   */
  #context: CanvasRenderingContext2D

  /**
   * @type {HTMLCanvasElement}
   */
  #canvas: HTMLCanvasElement

  /**
   * Constructor
   *
   * @param {number} rows
   * @param {number} cols
   * @param {number} cellSize
   * @param {string} gridColor
   * @param {string} gridBackgroundColor
   */
  constructor(
    rows: number = 11,
    cols: number = 13,
    cellSize: number = 50,
    gridColor: string = '#fff',
    gridBackgroundColor: string = '#000',
  ) {
    this.rows = rows
    this.cols = cols
    this.cellSize = cellSize

    this.#initCanvas()
    this.#initGrid(gridColor, gridBackgroundColor)

    this.#context.globalAlpha = 0.5

    this.#drawCyanTriangle([0, 0])
    this.#drawRedTriangle([5, 2])
    this.#drawYellowShape([0, 2])
    this.#drawGreenShape([0, 3])

    this.#drawRedTriangle([0, 6])
    this.#drawCyanTriangle([8, 9])
    this.#drawYellowShape([0, 9])
    this.#drawGreenShape([3, 9])
  }

  /**
   * Draw green shape
   *
   * @param   {[number, number]} offset
   * @returns {void}
   */
  #drawGreenShape(offset: Point): void {
    this.#drawPoly(
      [
        [0, 1],
        [0, 2],
        [5, 2],
        [5, 0],
        [2, 0],
        [2, 1],
      ],
      '#00ff00',
      offset,
    )
  }

  /**
   * Draw yellow shape
   *
   * @param   {[number, number]} offset
   * @returns {void}
   */
  #drawYellowShape(offset: Point): void {
    this.#drawPoly(
      [
        [0, 0],
        [0, 2],
        [2, 2],
        [2, 1],
        [5, 1],
        [5, 0],
      ],
      '#ffff00',
      offset,
    )
  }

  /**
   * Draw red triangle
   *
   * @param   {[number, number]} offset
   * @returns {void}
   */
  #drawRedTriangle(offset: Point): void {
    this.#drawPoly(
      [
        [0, 0],
        [0, 3],
        [8, 3],
      ],
      '#ff0000',
      offset,
    )
  }

  /**
   * Draw cyan triangle
   *
   * @param   {[number, number]} offset
   * @returns {void}
   */
  #drawCyanTriangle(offset: Point): void {
    this.#drawPoly(
      [
        [0, 0],
        [0, 2],
        [5, 2],
      ],
      '#00ffff',
      offset,
    )
  }

  /**
   * Draw poly
   *
   * @param   {[number, number][]} poly
   * @param   {string}             color
   * @param   {[number, number]}   offset
   * @returns {void}
   */
  #drawPoly(poly: Poly, color: string, offset: Point = [0, 0]): void {
    this.#context.beginPath()
    this.#context.fillStyle = color
    this.#context.moveTo(poly[0][0] + offset[0], poly[0][1] + offset[1])
    for (let i = 1; i < poly.length; i++) {
      this.#context.lineTo(poly[i][0] + offset[0], poly[i][1] + offset[1])
    }
    this.#context.fill()
  }

  /**
   * Init grid
   *
   * @param   {string} gridColor
   * @param   {string} gridBackgroundColor
   * @returns {void}
   */
  #initGrid(gridColor: string, gridBackgroundColor: string): void {
    this.#canvas.width = this.cols * this.cellSize
    this.#canvas.height = this.rows * this.cellSize

    this.#context.beginPath()
    this.#context.fillStyle = gridBackgroundColor
    this.#context.fillRect(0, 0, this.#canvas.width, this.#canvas.height)

    this.#context.scale(this.cellSize, this.cellSize)

    this.#initGridCells(gridColor)
  }

  /**
   * Init grid cells
   *
   * @param   {string} gridColor
   * @returns {void}
   */
  #initGridCells(gridColor: string): void {
    this.#context.beginPath()
    this.#context.strokeStyle = gridColor
    this.#context.lineWidth = 1 / this.cellSize
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        this.#context.rect(x, y, 1, 1)
      }
    }
    this.#context.stroke()
  }

  /**
   * Init canvas
   *
   * @returns {void}
   */
  #initCanvas(): void {
    this.#canvas = document.createElement('canvas')
    this.#context = this.#canvas.getContext('2d') as CanvasRenderingContext2D

    document.body.appendChild(this.#canvas)
  }
}
new App()
