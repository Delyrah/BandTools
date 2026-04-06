global using Microsoft.AspNetCore.Authorization;
global using Microsoft.AspNetCore.Mvc;
global using Microsoft.EntityFrameworkCore;
global using Microsoft.Extensions.Options;
global using Microsoft.IdentityModel.Tokens;

global using System.ComponentModel.DataAnnotations;
global using System.IdentityModel.Tokens.Jwt;
global using System.Security.Claims;
global using System.Security.Cryptography;
global using System.Text;

global using BandTools.Application.DTOs;
global using BandTools.Application.Mapping;
global using BandTools.Application.Services;
global using BandTools.Application.Services.Common;
global using BandTools.Domain.Entities;
global using BandTools.Domain.Entities.Common;
global using BandTools.Domain.Enums;
global using BandTools.Infrastructure.Settings;