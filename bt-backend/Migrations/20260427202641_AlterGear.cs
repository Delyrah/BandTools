using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BandTools.Migrations
{
    /// <inheritdoc />
    public partial class AlterGear : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Weight",
                table: "Gear",
                type: "decimal(18,2)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ValueCurrency",
                table: "Gear",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WeightUnit",
                table: "Gear",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ValueCurrency",
                table: "Gear");

            migrationBuilder.DropColumn(
                name: "WeightUnit",
                table: "Gear");

            migrationBuilder.AlterColumn<string>(
                name: "Weight",
                table: "Gear",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldNullable: true);
        }
    }
}
