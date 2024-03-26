--
-- Base de datos: `menudigital_db`
--
USE `menudigital_db`;

--
-- Cargado de datos para la tabla `types` 
--

INSERT INTO `types` (`id`, `name`) VALUES
(1, 'Pizza'),
(2, 'Hamburguesa'),
(3, 'Acompañamiento'),
(4, 'Comida Mexicana'),
(5, 'Comida Oriental'),
(6, 'Postre');

--
-- Cargado de datos para la tabla `categories_products` 
--

INSERT INTO `categories_products` (`id`, `name`) VALUES
(1, 'Popular'),
(2, 'Nuevo');

--
-- Cargado de datos para la tabla `categories_users` 
--

INSERT INTO `categories_users` (`id`, `name`) VALUES
(1, 'Admin'),
(2, 'Member');

--
-- Cargado de datos para la tabla `products` 
--

INSERT INTO `products` (`id`, `name`, `description`, `image`, `category_id`, `type_id`, `price`) VALUES
(1, 'Pizza Margarita', 'Nuestra deliciosa pizza margarita esta formada por una masa de pizza napolitana como base y acompañada por 6 ingredientes solamente. Tan sencillo como un poco de tomate, queso mozzarella, albahaca fresca, sal, pimienta negra recién molida y aceite de oliva virgen extra. Es sin duda la pizza más popular.', 'pizza-margarita.png', 1, 1, 1800),
(2, 'Pizza de Pepperoni', 'Nuestra deliciosa pizza de pepperoni está hecha con una base de salsa de tomate, mozzarella y pepperoni, un tipo de salami curado hecho a base de carne de cerdo y de vaca mezclados y sazonados con pimentón.', 'pizza-pepperoni.png', 2, 1, 1500),
(3, 'Pizza Clasica', 'Nuestra deliciosa pizza clasica esta formada con una masa la cual es crujiente, tanto en su base como en sus bordes conntiene los ingredicentes basicos como el queso y la salsa de tomate.', 'pizza-clasica.jpg', 1, 1, 1400),
(4, 'Hamburguesa Clasica', 'Nuestra hamburguesa clásica es más que un simple plato, es una celebración de la calidad y la tradición. Hemos perfeccionado nuestra receta para ofrecerte una hamburguesa que destaca por su sencillez y su sabor excepcional. Contiene pan, 1 carne de res, lechuga, tomate, queso y salsa.', 'hamburguesa-clasica.jpg', 1, 2, 1800),
(5, 'Hamburguesa Suprema', 'Nuestra deliciosa hamburguesa suprema es infaltable en tu pedido esta delicia contiene pan, 1 Carne de res, cheddar, tocino, salsa golf y mayonesa, no incluye las papas fritas mostradas en la foto.', 'hamburguesa.jpg', 1, 2, 2500),
(6, 'Hamburguesa Vegetariana', 'Nuestra deliciosa hamburguesa vegetariana es una variante de la hamburguesa tradicional que evita la carne picada para emplear productos vegetales idóneos para los vegetarianos o veganos. Contiene avena, remolacha y lentejas y ceunta con 15g de proteína por hamburguesa, y 0% colesterol.', 'hamburguesa-vegana.png', 2, 2, 2000),
(7, 'Papas Fritas', 'Es un acompañamiento habitual en las comidas rapidas que consiste en verduras cortadas a dados de pequeño tamaño que son sumamente deliciosas.', 'papas-fritas.jpg', 1, 3, 1500),
(8, 'Aros de Cebolla', 'Es un acompañamiento que consiste en cebollas cortadas transversalmente para que se puedan poner en forma de anillo que son rebozados en harina con algo de levadura y posteriormente son fritos en aceite, indispensables en tus comidas.', 'aros-cebolla.jpg', 2, 3, 1300),
(9, 'Tacos', 'Nuestros deliciosos tacos consisten en una tortilla de maíz, carne picada, pimiento rojo, pimiento verde, ajo, salsa de tomate y limón. En el pedido llegan 2 unidades.', 'tacos.jpg', 1, 4, 2000),
(10, 'Burrito', 'Nuestro delicioso burrito mexicano de carne picada es un plato típico de las fronteras de México. El mismo contiene aceite, cebolla blanca, pimientos verdes, pimientos rojos y carne picada.', 'burrito.jpg', 1, 4, 2500),
(11, 'Rollitos de Primavera', 'En Menu Digital te ofrecemos una sabrosa mezcla de verduras frescas envueltas en una fina y crujiente masa según la auténtica receta del lejano Oriente. Déjate seducir por el exotismo de los Rollitos de Primavera con su deliciosa salsa agridulce y descubrirás una forma diferente de comer verduras.', 'rollitos-primavera.jpg', 2, 5, 3000),
(12, 'Dumplings', 'En Menu Digital, nos enorgullece llevar a tu mesa la autenticidad y el sabor de los dumplings asiáticos. Cada uno de nuestros dumplings es una obra de arte culinaria, preparada con dedicación y los ingredientes más frescos.', 'dumplings.jpg', NULL, 5, 3300),
(13, 'Sushi', 'En Menu Digital, llevamos la experiencia del sushi a otro nivel. Nuestra pasión por la gastronomía japonesa se refleja en cada rollo que preparamos, combinando tradición y creatividad para ofrecerte una experiencia culinaria inolvidable. Utilizamos solo los ingredientes más frescos, seleccionando cuidadosamente cada pieza de pescado y vegetal para garantizar la máxima calidad y sabor.', 'sushi.jpg', 1, 5, 4000),
(14, 'Helado de Vainilla', 'En Menu Digital, creemos que la simplicidad es la forma más pura de perfección. Por eso, nuestro helado de vainilla está hecho para capturar la esencia de este sabor clásico, utilizando ingredientes de la más alta calidad y un proceso de elaboración artesanal que garantiza una textura cremosa y un sabor rico que se destaca en cada bocado.', 'helado-vainilla.jpg', 2, 6, 2000),
(15, 'Brownie de Chocolate', 'En Menu Digital, elevamos el brownie de chocolate a nuevas alturas de placer. Cada uno de nuestros brownies es una obra maestra de sabor, creada con una mezcla especial de chocolates premium y horneada a la perfección para lograr ese balance ideal entre un exterior crujiente y un interior suave y húmedo que se derrite en tu boca.', 'brownie.jpg', 2, 6, 3000);

--
-- Cargado de datos para la tabla `users` 
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `category_id`, `image`) VALUES
(1, 'Juan', 'Pérez', 'juan.perez@example.com', '$2a$10$YpRgJb/st4ogcyONECkRxOCAicDolZZVRdgE/6qR.tbEi9mPZnuuK', 1, 'default-image-user.png'),
(2, 'María', 'González', 'maria.gonzalez@example.com', '$2a$10$7iLKJ/rAYjJshJwUseXshOtwZrojYLps4jgu7g/FUljIe/w9AACzC', 2, 'default-image-user.png'),
(3, 'Carlos', 'López', 'carlos.lopez@example.com', '$2a$10$TBuFfJfWaDveovntBMx/v.OQGcpM./d24r52dISZOnaeS3o74E6vu', 1, 'default-image-user.png'),
(4, 'Ana', 'Martínez', 'ana.martinez@example.com', '$2a$10$aUGj2fWiOmzO3hjRq9iw.eF3lebNPsNI/P5MAYLYwZyNxXXsQoq/y', 2, 'default-image-user.png'),
(5, 'Roberto', 'Fernández', 'roberto.fernandez@example.com', '$2a$10$YpRgJb/st4ogcyONECkRxOCAicDolZZVRdgE/6qR.tbEi9mPZnuuK', 1, 'default-image-user.png'),
(6, 'Luisa', 'Jiménez', 'luisa.jimenez@example.com', '$2a$10$w2F1sAJQU11oOm4VrX9i0OGMrl8PqiPUxBsMqzKtRQ9.bkipXdAee', 1, 'default-image-user.png'),
(7, 'Pedro', 'Ramírez', 'pedro.ramirez@example.com', '$2a$10$bSxp37tdy7KhUaPDRFDIHOK8OTnrJjPBdBp.5fgINrIScNHHRefx2', 2, 'default-image-user.png'),
(8, 'Sofía', 'García', 'sofia.garcia@example.com', '$2a$10$DYpYgbecTI8CZX.ShS5rzOAi0J5ejU63glMVa9vdIoQk/U7VtExZe', 2, 'default-image-user.png');

--
-- Cargado de datos para la tabla `carts` 
--

INSERT INTO `carts` (`id`, `date`, `user_id`) VALUES
(1, '2002-08-06', 1),
(2, '2002-08-06', 2);

--
-- Cargado de datos para la tabla `product_cart` 
--

INSERT INTO `product_cart` (`id`, `product_id`, `cart_id`, `count_items`, `total_price`) VALUES
(1, 1, 1, 3, 5400),
(2, 14, 1, 1, 2000),
(3, 5, 2, 1, 2500),
(4, 7, 2, 2, 3000),
(5, 14, 2, 1, 2000);