USE [HeartBeet]
GO

/****** Object:  Table [dbo].[Donation]    Script Date: 12/10/2021 7:57:19 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Donation](
	[id] [uniqueidentifier] NOT NULL primary key,
	[isDelivery] [bit] NOT NULL,
	[donorId] [uniqueidentifier] NOT NULL,
	[recipientId] [uniqueidentifier] NULL,
	[claimed] [bit] NOT NULL,
	[received] [bit] NOT NULL,
	[locationId] [uniqueidentifier] NOT NULL,
	[deliveryLocationId] [uniqueidentifier] NULL
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Donation] ADD  CONSTRAINT [DF_Donation_id]  DEFAULT (newid()) FOR [id]
ALTER TABLE [dbo].[Donation] ADD  CONSTRAINT [DF_Donation_deliveryLocationId]  DEFAULT (NULL) FOR [deliveryLocationId]
ALTER TABLE [dbo].[Donation] ADD  CONSTRAINT [DF_Donation_recipientId]  DEFAULT (NULL) FOR [recipientId]

GO


CREATE TABLE [dbo].[Item](
	[id] [uniqueidentifier] NOT NULL,
	[donationId] [uniqueidentifier] NOT NULL,
	[food] [varchar](50) NOT NULL,
	[quantity] [varchar](50) NOT NULL,
	[datePrepared] [date] NULL,
	[bestBy] [date] NULL,
 CONSTRAINT [PK_Item] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Item] ADD  CONSTRAINT [DF_Item_id]  DEFAULT (newid()) FOR [id]
GO

ALTER TABLE [dbo].[Item]  WITH CHECK ADD  CONSTRAINT [FK_Item_Donation] FOREIGN KEY([donationId])
REFERENCES [dbo].[Donation] ([id])
GO

ALTER TABLE [dbo].[Item] CHECK CONSTRAINT [FK_Item_Donation]
GO

CREATE TABLE [dbo].[Location](
	[id] [uniqueidentifier] NOT NULL,
	[userId] [uniqueidentifier] NOT NULL,
	[street] [varchar](50) NOT NULL,
	[city] [varchar](50) NOT NULL,
	[state] [varchar](50) NOT NULL,
	[zip] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Location] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Location] ADD  CONSTRAINT [DF_Location_id]  DEFAULT (newid()) FOR [id]
GO

ALTER TABLE [dbo].[Location]  WITH CHECK ADD  CONSTRAINT [FK_Location_Location] FOREIGN KEY([id])
REFERENCES [dbo].[Location] ([id])
GO

ALTER TABLE [dbo].[Location] CHECK CONSTRAINT [FK_Location_Location]
GO

CREATE TABLE [dbo].[User](
	[id] [uniqueidentifier] NOT NULL,
	[uid] [uniqueidentifier] NULL,
	[name] [varchar](50) NOT NULL,
	[email] [varchar](50) NOT NULL,
	[userType] [varchar](50) NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[User] ADD  CONSTRAINT [DF_User_id]  DEFAULT (newid()) FOR [id]
GO





