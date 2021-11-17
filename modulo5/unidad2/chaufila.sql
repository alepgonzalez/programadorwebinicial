-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 17-11-2021 a las 02:39:09
-- Versión del servidor: 5.7.31
-- Versión de PHP: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `chaufila`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

DROP TABLE IF EXISTS `servicios`;
CREATE TABLE IF NOT EXISTS `servicios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `subtitulo` text COLLATE utf8_unicode_ci NOT NULL,
  `cuerpo` text COLLATE utf8_unicode_ci NOT NULL,
  `nombre_imagen` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`id`, `titulo`, `subtitulo`, `cuerpo`, `nombre_imagen`) VALUES
(1, 'Mensajería Empresarial', 'Empresas', 'Sabemos lo importante que es para tu empresa y para ti, tener un aliado en logística de mensajería.\r\nRealizamos todo tipo de trámites y logística que tu empresa necesita: bancarios, administrativos, a proveedores u organizaciones.', 'servicio1.jpg'),
(2, 'Servicio Esencial', 'Servicios', 'No pierdas tiempo en filas y disfrutá de tu tiempo, nosotros nos encargamos de tus trámites y retiros de compras.', 'servicio2.jpg'),
(3, 'Servicio Express', 'Express', 'En Chau Fila, hemos llevado el concepto de mensajería un paso más allá al ofrecer una logística de servicio completo con experiencia.\r\nOfrecemos el mejor servicio de mensajería empresarial, en el momento que lo requieran de manera rápida y eficaz.', 'servicio3.jpg'),
(4, 'Quedate en casa', 'Particulares', 'Realizamos retiro y despacho de encomiendas y cargas a diferentes transportes locales, entregas a domicilio, con envíos locales, nacionales, express y urgentes.', 'servicio4.jpg'),
(12, 'prueba modificada', 'prueba', 'prueba', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `password`) VALUES
(1, 'ale', '81dc9bdb52d04dc20036dbd8313ed055');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
