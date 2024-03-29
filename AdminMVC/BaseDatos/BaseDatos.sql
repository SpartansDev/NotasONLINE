CREATE DATABASE NotasOnline
GO
USE [NotasOnline]
GO
/****** Object:  Table [dbo].[Administradores]    Script Date: 13/11/2019 11:49:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Administradores](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[NombreAdministrador] [varchar](100) NOT NULL,
	[ApellidoAdministrador] [varchar](100) NOT NULL,
	[Email] [varchar](100) NOT NULL,
	[Contraseña] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Carreras]    Script Date: 13/11/2019 11:49:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Carreras](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[NombreCarrera] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DetallesInscripcion]    Script Date: 13/11/2019 11:49:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DetallesInscripcion](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[MatriculaId] [bigint] NOT NULL,
	[ModuloId] [bigint] NOT NULL,
	[Nota1] [decimal](18, 1) NOT NULL,
	[Nota2] [decimal](18, 1) NOT NULL,
	[Nota3] [decimal](18, 1) NOT NULL,
	[Nota4] [decimal](18, 1) NOT NULL,
	[Nota5] [decimal](18, 1) NOT NULL,
	[NotaFinal] [decimal](18, 1) NOT NULL,
	[Status] [bigint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Estudiantes]    Script Date: 13/11/2019 11:49:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Estudiantes](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[NombreEstudiante] [varchar](100) NOT NULL,
	[ApellidoEstudiante] [varchar](100) NOT NULL,
	[Codigo] [varchar](50) NOT NULL,
	[CarreraId] [bigint] NOT NULL,
	[Contraseña] [varchar](50) NOT NULL,
	[StatusStudent] [bigint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Grupos]    Script Date: 13/11/2019 11:49:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Grupos](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[NombreGrupo] [varchar](30) NOT NULL,
	[Turno] [varchar](50) NOT NULL,
	[CarreraId] [bigint] NOT NULL,
	[ProfesorId] [bigint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Matriculas]    Script Date: 13/11/2019 11:49:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Matriculas](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Año] [varchar](12) NOT NULL,
	[Ciclo] [varchar](10) NOT NULL,
	[CarreraId] [bigint] NOT NULL,
	[EstudianteId] [bigint] NOT NULL,
	[GrupoId] [bigint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Modulos]    Script Date: 13/11/2019 11:49:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Modulos](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[NombreModulo] [varchar](100) NOT NULL,
	[CarreraId] [bigint] NOT NULL,
	[UV] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Profesores]    Script Date: 13/11/2019 11:49:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Profesores](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[NombreProfesor] [varchar](100) NOT NULL,
	[ApellidoProfesor] [varchar](100) NOT NULL,
	[Email] [varchar](100) NOT NULL,
	[Contraseña] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[DetallesInscripcion]  WITH CHECK ADD FOREIGN KEY([MatriculaId])
REFERENCES [dbo].[Matriculas] ([Id])
GO
ALTER TABLE [dbo].[DetallesInscripcion]  WITH CHECK ADD FOREIGN KEY([ModuloId])
REFERENCES [dbo].[Modulos] ([Id])
GO
ALTER TABLE [dbo].[Estudiantes]  WITH CHECK ADD FOREIGN KEY([CarreraId])
REFERENCES [dbo].[Carreras] ([Id])
GO
ALTER TABLE [dbo].[Grupos]  WITH CHECK ADD FOREIGN KEY([CarreraId])
REFERENCES [dbo].[Carreras] ([Id])
GO
ALTER TABLE [dbo].[Grupos]  WITH CHECK ADD FOREIGN KEY([ProfesorId])
REFERENCES [dbo].[Profesores] ([Id])
GO
ALTER TABLE [dbo].[Matriculas]  WITH CHECK ADD FOREIGN KEY([CarreraId])
REFERENCES [dbo].[Carreras] ([Id])
GO
ALTER TABLE [dbo].[Matriculas]  WITH CHECK ADD FOREIGN KEY([EstudianteId])
REFERENCES [dbo].[Estudiantes] ([Id])
GO
ALTER TABLE [dbo].[Matriculas]  WITH CHECK ADD FOREIGN KEY([GrupoId])
REFERENCES [dbo].[Grupos] ([Id])
GO
ALTER TABLE [dbo].[Modulos]  WITH CHECK ADD FOREIGN KEY([CarreraId])
REFERENCES [dbo].[Carreras] ([Id])
GO
