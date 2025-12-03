-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-12-2025 a las 01:31:22
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tp_nodejs`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `OperadorAlta` smallint(6) DEFAULT NULL,
  `FechaAlta` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`, `OperadorAlta`, `FechaAlta`) VALUES
(1, 'Tecnología', 1, '2025-12-02 21:03:47'),
(2, 'Audio', 1, '2025-12-02 21:06:04'),
(3, 'Electrodomésticos', 1, '2025-12-02 21:06:04'),
(4, 'Hogar', 1, '2025-12-02 21:29:02'),
(5, 'Moda', 1, '2025-12-02 21:29:02'),
(6, 'Oficina', 1, '2025-12-02 21:29:18'),
(7, 'Gaming', 1, '2025-12-02 21:29:18'),
(8, 'Computadoras', 1, '2025-12-02 21:29:56'),
(9, 'Notebooks', 1, '2025-12-02 21:29:56'),
(10, 'Computadoras', 1, '2025-12-02 21:29:58'),
(11, 'Notebooks', 1, '2025-12-02 21:29:58'),
(12, 'Accesorios', 1, '2025-12-02 21:30:26'),
(13, 'Cocina', 1, '2025-12-02 21:30:26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `operadores`
--

CREATE TABLE `operadores` (
  `id` smallint(6) NOT NULL COMMENT 'id Incremeatl de operador',
  `nombre` varchar(40) NOT NULL,
  `password` varchar(64) NOT NULL,
  `intentos` tinyint(4) DEFAULT NULL,
  `tipooperador` tinyint(4) NOT NULL,
  `FechaUtimoLogin` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `operadores`
--

INSERT INTO `operadores` (`id`, `nombre`, `password`, `intentos`, `tipooperador`, `FechaUtimoLogin`) VALUES
(1, 'Admin', '', 0, 1, '2025-12-03 01:09:36'),
(2, 'Usuario', '', 0, 2, '2025-12-03 01:09:36');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL COMMENT 'Id Autoincremental',
  `nombre` varchar(40) NOT NULL COMMENT 'Nombre del Producto',
  `precio` double NOT NULL COMMENT 'Precio del Producto',
  `categorias` varchar(100) NOT NULL COMMENT 'Contiene un Array de Categorías',
  `stock` int(11) NOT NULL COMMENT 'Stock de productos disponible (unidades)',
  `FechaAlta` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Fecha de Alta del Producto',
  `OperadorAlta` tinyint(4) NOT NULL COMMENT 'Operador de Alta del producto',
  `FechaModificacion` datetime DEFAULT NULL COMMENT 'Fecha de la última modificación del Producto',
  `OperadorModificacion` tinyint(4) DEFAULT NULL COMMENT 'Operador de la última modificación del Producto'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `precio`, `categorias`, `stock`, `FechaAlta`, `OperadorAlta`, `FechaModificacion`, `OperadorModificacion`) VALUES
(1, 'Notebook Lenovo IdeaPad 15', 699000, '[\"Tecnología\", \"Computadoras\", \"Notebooks\"]', 25, '2025-12-02 21:08:13', 1, NULL, 0),
(2, 'Auriculares Bluetooth Sony WH-CH520', 85000, '[\"Hogar\", \"Cocina\", \"Electrodomésticos\"]', 230, '2025-12-02 21:08:13', 1, NULL, 0),
(3, 'Cafetera Oster Programable', 120000, '[\"Hogar\", \"Cocina\", \"Electrodomésticos\"]', 30, '2025-12-02 21:24:22', 1, NULL, NULL),
(4, 'Zapatillas Nike Revolution 6', 95000, '[\"Moda\", \"Calzado\", \"Deportes\"]', 90, '2025-12-02 21:24:22', 1, NULL, NULL),
(5, 'Cafetera Oster Programable', 120000, '[\"Hogar\", \"Cocina\", \"Electrodomésticos\"]', 30, '2025-12-02 21:24:26', 1, NULL, NULL),
(6, 'Zapatillas Nike Revolution 6', 95000, '[\"Moda\", \"Calzado\", \"Deportes\"]', 90, '2025-12-02 21:24:26', 1, NULL, NULL),
(7, 'Silla Ergonómica Gamer RGB', 185000, '[\"Hogar\", \"Oficina\", \"Gaming\"]', 15, '2025-12-02 21:25:49', 1, NULL, NULL),
(8, 'Mouse Pad Gamer XL', 1000, '[\"Tecnología\", \"Gaming\", \"Accesorios\"]', 50, '2025-12-02 21:25:49', 1, NULL, NULL),
(9, 'Silla Ergonómica Gamer RGB', 185000, '[\"Hogar\", \"Oficina\", \"Gaming\"]', 15, '2025-12-02 21:25:51', 1, NULL, NULL),
(10, 'Mouse Pad Gamer XL', 1000, '[\"Tecnología\", \"Gaming\", \"Accesorios\"]', 50, '2025-12-02 21:25:51', 1, NULL, NULL),
(11, 'Cable USB - Type C 1 metro', 1000, '[\"Tecnología\", \"Accesorios\"]', 230, '2025-12-02 21:28:03', 1, NULL, NULL),
(12, 'Microfono Hyperx Quadcast 2 S USB Black ', 195000, '[\"Tecnología\", \"Audio\", \"Accesorios\"]', 4, '2025-12-02 21:28:03', 1, NULL, NULL),
(13, 'Cable USB - Type C 1 metro', 1000, '[\"Tecnología\", \"Accesorios\"]', 230, '2025-12-02 21:28:11', 1, NULL, NULL),
(14, 'Microfono Hyperx Quadcast 2 S USB Black ', 195000, '[\"Tecnología\", \"Audio\", \"Accesorios\"]', 4, '2025-12-02 21:28:11', 1, NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `operadores`
--
ALTER TABLE `operadores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `operadores`
--
ALTER TABLE `operadores`
  MODIFY `id` smallint(6) NOT NULL AUTO_INCREMENT COMMENT 'id Incremeatl de operador', AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id Autoincremental', AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
