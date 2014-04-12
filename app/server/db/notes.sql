--
-- Database: `demo`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `notes`
--

CREATE TABLE IF NOT EXISTS `notes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `note` varchar(140) NOT NULL,
  `isChecked` tinyint(1) NOT NULL,
  `signedDate` date NOT NULL,
  `completedDate` date NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;