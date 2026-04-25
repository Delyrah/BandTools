namespace BandTools.Application.Mapping;

public static class Gearmapper
{
    public static GearDto ToDto(this Gear gear) => new()
    {
        Id = gear.Id,
        BandId = gear.BandId,
        Name = gear.Name,
        OwnerId = gear.OwnerId,
        Type = gear.Type,
        Brand = gear.Brand,
        Model = gear.Model,
        SerialNumber = gear.SerialNumber,
        Value = gear.Value,
        PhotoUrl = gear.PhotoUrl,
        Notes = gear.Notes,
        Weight = gear.Weight,
        Dimensions = gear.Dimensions
    };
}