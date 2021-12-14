USE [HeartBeet]
GO

INSERT INTO [dbo].[Item]
           ([id]
           ,[donationId]
           ,[food]
           ,[quantity]
           ,[datePrepared]
           ,[bestBy])
     VALUES
           ('5098234C-358B-4500-AD56-EFE74EED687F',
           '4BC01C12-22E1-41E1-9B2D-41A7EAF6105F',
           'Green Beans',
           10,
           cast('2021-11-11' as date),
		   cast('2021-12-11' as date))

INSERT INTO [dbo].[Donation]
           ([id]
           ,[isDelivery]
           ,[donorId]
           ,[recipientId]
           ,[claimed]
           ,[received]
           ,[locationId]
           ,[deliveryLocationId]
		   ,[softDelete])
     VALUES
           ('4BC01C12-22E1-41E1-9B2D-41A7EAF6105F',
           0,
		   '8B864B59-FAD1-414C-8811-D8CD9FA795E7',
		   '7AAF147D-5D19-423D-ABC8-C0E5906DB578',
           1,
           0,
		   'C800FE94-DD1F-4A15-A12A-D3A233914515',
		   NULL,
		   0)

INSERT INTO [dbo].[User]
           ([id]
           ,[name]
           ,[email]
           ,[userType]
           ,[uid]
		   ,[softDelete])
     VALUES
           ('7AAF147D-5D19-423D-ABC8-C0E5906DB578',
           'Nashville Food Project',
		   'nashvillefoodproject@gmail.com',
		   'recipient',
		   NULL,
		   0),

		    ('8B864B59-FAD1-414C-8811-D8CD9FA795E7',
			'Whole Foods Market',
			'wholefoods@gmail.com',
			'donor',
			NULL,
			0),

		    ('9440D2E0-06DA-4930-AE5E-EF93A19F8399',
			'Publix Super Markets Inc.',
			'publix@gmail.com',
			'donor',
			NULL,
			0)

INSERT INTO [dbo].[Location]
           ([id]
           ,[userId]
           ,[street]
           ,[city]
           ,[state]
           ,[zip]
		   ,[softDelete])
     VALUES
           ('A7DB9085-966F-490B-989B-AB2B0CE834C3',
		   '7AAF147D-5D19-423D-ABC8-C0E5906DB578',
		   '5904 California Ave',
		   'Nashville',
		   'TN',
		   '37209',
		   0),

		   ('C800FE94-DD1F-4A15-A12A-D3A233914515',
		   '8B864B59-FAD1-414C-8811-D8CD9FA795E7',
		   '1566 W McEwen Dr',
		   'Franklin',
		   'TN',
		   '37067',
		   0)


